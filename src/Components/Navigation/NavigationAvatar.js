import { Tooltip, IconButton, Avatar } from '@mui/material';   

const NavigationAvatar = ({
    userInitials,
    handleUserProfile,
}) => {

    return (
        <>
        <Tooltip title="Go to Profile">
            <IconButton onClick={handleUserProfile}>
                <Avatar sx={{ width: 40, height: 40, fontSize: 18 }}>
                    {userInitials}
                </Avatar>
            </IconButton>
        </Tooltip>
        </>
    );
}

export default NavigationAvatar;