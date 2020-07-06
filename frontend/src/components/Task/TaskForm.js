import * as React from 'react';
import { Create, Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, BooleanInput, required } from 'react-admin';
import { parse } from 'query-string';

export const TaskCreate = (props) => {
  const { project_id: project_id_val } = parse(props.location.search);
  const procject_id = project_id_val;
  const redirect = project_id_val ? `/project/${procject_id}/show/task` : false;

  return (
    <Create {...props}>
      <SimpleForm
        defaultValue={{ procject_id }}
        redirect={redirect}
      >
        <ReferenceInput
          source="procject_id"
          reference="project"
          allowEmpty
          validate={required()}
        >
          <SelectInput optionText="title" />
        </ReferenceInput>
        <TextInput source="title" />
        <BooleanInput label="Done" source="done" />
      </SimpleForm>
    </Create>
  );
}

export const TaskEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm
        redirect={`/project`}
      >
        <TextInput source="title" />
        <BooleanInput label="Done" source="done" />
      </SimpleForm>
    </Edit>
  );
}
