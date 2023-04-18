import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const removeUser = createAsyncThunk('user/remove', async (user) => {

    await axios.delete(`http://localhost:3005/users/${user.id}`);

    // that thing goes into action.payload !!
    return user;

});

export { removeUser };