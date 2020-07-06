import * as React from 'react';
import { Create, Edit, SimpleForm, TextInput } from 'react-admin';

export const ProjectCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput label="Project" source="title" />
    </SimpleForm>
  </Create>
);
