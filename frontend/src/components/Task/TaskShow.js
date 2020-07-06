import * as React from 'react';
import { Show, SimpleForm, TextInput, ReferenceInput, SelectInput, BooleanInput, required } from 'react-admin';
import { parse } from 'query-string';

export const TaskShow = (props) => {
  const { project_id: project_id_val } = parse(props.location.search);
  const procject_id = project_id_val;
  const redirect = project_id_val ? `/project/${procject_id}/show/task` : false;

  return (
    <Show {...props}>
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
    </Show>
  );
}
