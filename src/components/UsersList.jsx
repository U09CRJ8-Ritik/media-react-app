import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useThunk from '../hooks/use-thunk'
import { addUser, fetchUsers } from '../store'
import Button from './Button'
import Skelton from './Skelton'
import UserListItem from './UserListItem'


const UsersList = () => {

    const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);

    const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

    // const dispatch = useDispatch();

    const { data } = useSelector((state) => {
        return state.users;
    })

    useEffect(() => {
        doFetchUsers();
    }, [doFetchUsers]);

    const handleUserAdd = () => {
        doCreateUser();
    }

    let content;

    if (isLoadingUsers) {
        content = <Skelton times={6} className="h-10 w-full" />
    } else if (loadingUsersError) {
        content = <div>Error fetching data...</div>
    } else {
        content = data.map((user) => {
            return <UserListItem key={user.id} user={user} />
        });
    }

    return (
        <div>
            <div className="flex flex-row justify-between items-center m-3">
                <h1 className='m-2 text-xl'>Users</h1>
                <Button loading={isCreatingUser} onClick={handleUserAdd}>
                    + Add User
                </Button>
                {creatingUserError && 'Error creating User'}
            </div>
            {content}
        </div>
    )
}

export default UsersList
