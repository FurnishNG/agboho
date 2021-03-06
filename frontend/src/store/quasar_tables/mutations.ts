import { SelectionAction } from 'src/types/table';
import { MutationTree } from 'vuex';
import { QuasarTableStateInterface, DataRows } from './state';
import { Ref } from 'vue';

const mutation: MutationTree<QuasarTableStateInterface> = {
  SET_TABLE_DATA(state: QuasarTableStateInterface, payload: DataRows) {
    state.rows = payload;
  },

  DELETE_TABLE_DATA_ROW(state: QuasarTableStateInterface, rowId: string) {
    state.rows = state.rows.filter((row) => row.id !== rowId);
  },

  SET_SELECTED_ROWS(
    state: QuasarTableStateInterface,
    payload: DataRows | null
  ) {
    if (payload === null) state.selectedRows = [];
    else if (payload.length === 0) state.selectedRows = [];
    else state.selectedRows = payload.map((row) => row.id as string);
  },

  SET_SELECTION_ACTIONS(
    state: QuasarTableStateInterface,
    payload: Readonly<Ref<SelectionAction[]>>
  ) {
    state.selectionActions = payload.value;
  },
};

export default mutation;
