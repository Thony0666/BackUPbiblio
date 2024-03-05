import React from 'react';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/system';

const RootBox = styled(Box)({
    padding: '16px',
    background: '#f5f5f5',
    borderRadius: '8px'
});

const CommentBox = styled(Box)({
    display: 'flex',
    marginBottom: '16px',
    alignItems: 'center' // Center items vertically
});

const CommentTextField = styled(TextField)({
    flexGrow: 1,
    marginRight: '16px'
});

const CommentButton = styled(Button)({
    alignSelf: 'flex-end',
    margin: '18px'
});

const CommentContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: ' 2px 1px 8px 7px rgba(0,0,0,0.12)',
    background: '#fff'
});

const CommentAvatar = styled(Avatar)({
    marginRight: '16px'
});

const handlePostClick = () => {
    // Handle the post button click event
    console.log('Post button clicked');
    // You can add your post comment logic here
};

const Commentaires = () => {
    return (
        <RootBox>
            <CommentBox>
                <CommentTextField label="Alefaso eto ny resadresaka" variant="outlined" fullWidth margin="normal" />
                <CommentButton variant="contained" color="primary" endIcon={<SendIcon />} onClick={handlePostClick}>
                    ALEFA
                </CommentButton>
            </CommentBox>

            {/* Sample Comments */}
            <Comment avatarSrc="https://example.com/avatar1.jpg" author="Tonny" text="Mahafinaritra 👌👌" />
            <Comment avatarSrc="https://example.com/avatar2.jpg" author="Firmin" text="Misaotra tompoko!👍🙏🏾🙏🏾" />
        </RootBox>
    );
};

const Comment = ({ avatarSrc, author, text }) => {
    return (
        <CommentContainer>
            <CommentAvatar src={avatarSrc} alt={author} />
            <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                    {author}
                </Typography>
                <Typography variant="body1">{text}</Typography>
            </Box>
        </CommentContainer>
    );
};

export default Commentaires;
