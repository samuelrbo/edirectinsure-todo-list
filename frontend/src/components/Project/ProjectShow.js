import React from 'react';
import {
  Datagrid, DateField, ReferenceManyField, Show, DeleteButton,
  Tab, BooleanField, TabbedShowLayout, TextField, EditButton
} from 'react-admin';
import AddTaskButton from './AddTaskButton';

export const ProjectShow = props => (
  <Show {...props}>
    <TabbedShowLayout>
      <Tab label="Summary">
        <TextField source="id" />
        <TextField source="title" />
      </Tab>
      <Tab label="Tasks" path="task">
        <ReferenceManyField
          addLabel={false}
          reference="task"
          target="project_id"
        >
          <Datagrid>
            <BooleanField source="done" />
            <TextField source="title" />
            <DateField source="createdAt" />
            <EditButton />
            <DeleteButton undoable={false} />
          </Datagrid>
        </ReferenceManyField>
        <AddTaskButton />
      </Tab>
    </TabbedShowLayout>
  </Show>
);
