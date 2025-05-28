'use client'
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    InputAdornment,
    IconButton,
    CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { login } from '@/redux/thunk/authThunk';
import { toast } from 'react-toastify';
import Image from 'next/image';

const MotionMuiCard = motion(Card);

// full-screen gradient
const PageWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: linear-gradient(
        135deg,
        var(--white) 0%,
        var(--blue-200) 100%
    );
    padding: 1rem;
`;

// motion-enabled Card
const MotionCard = styled(MotionMuiCard)`
    width: 100%;
    max-width: 700px;
    border-radius: 16px;
    padding: 1.5rem;

    /* ↓ translucent white */
    background-color: rgba(255,255,255,0.9) !important;

    /* ↓ backdrop blur */
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);

    /* subtle border to help it stand out */
    border: 1px solid rgba(255,255,255,0.25);

    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 32px rgba(0,0,0,0.15);
    }
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
`;

const textFieldSx = {
    '& .MuiOutlinedInput-root': {
        backgroundColor: 'var(--white)',
        borderRadius: 4,              // whatever rounding you like

        // when that root also has Mui-focused…
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--blue-700)',
            borderWidth: 2,
        },
    },

    '& .MuiInputLabel-root': {
        color: 'var(--grey-700)',
    },
    // label when the field is focused
    '& .MuiInputLabel-root.Mui-focused': {
        color: 'var(--blue-700)',
    },
}


const LoginHead = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default function LoginForm() {
    const dispatch = useDispatch();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPwd, setShowPwd] = useState(false);
    const { loading, message, success } = useSelector(state => state.auth);

    const handleSubmit = async e => {
        e.preventDefault();
        if (!email || !password) {
            toast.warning('Email and password are required!');
            return;
        }
        try {
            const res = await dispatch(login({ email, password }));
            if (res.payload.success) {
                toast.success(res.payload.message);
                router.replace("/");
                return;
            } 
            toast.error(res.payload);
        } catch (err) {
            console.log(err);
            toast.error('Login failed');
        }
    };

    return (
        <PageWrapper>
            <MotionCard
                elevation={0}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            >
                <CardContent>
                    <LoginHead>
                        <Image alt='logo' src="/images/logo.png" width={150} height={150} />
                        <Typography
                            variant="h3"
                            align="center"
                            gutterBottom
                            sx={{ color: 'var(--black)', letterSpacing: 1.2 }}
                        >
                            ĐĂNG NHẬP
                        </Typography>
                    </LoginHead>
                    <StyledForm onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            fullWidth
                            variant="outlined"
                            sx={textFieldSx}
                        />

                        <TextField
                            label="Password"
                            type={showPwd ? 'text' : 'password'}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            fullWidth
                            variant="outlined"
                            sx={textFieldSx}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            edge="end"
                                            onClick={() => setShowPwd(v => !v)}
                                            size="small"
                                        >
                                            {showPwd ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                                type="submit"
                                fullWidth
                                disabled={loading}
                                variant="contained"
                                sx={{
                                    padding: '0.75rem',
                                    mt: 1,
                                    backgroundColor: 'var(--primary-400)',
                                    color: 'var(--white)',
                                    fontWeight: 600,
                                    '&:hover': {
                                        backgroundColor: 'var(--primary-700)'
                                    }
                                }}
                            >
                                {loading
                                    ? <CircularProgress size={24} color="white" />
                                    : 'Sign In'}
                            </Button>
                        </motion.div>
                        <Typography align="center" sx={{ mt: 2 }}>
                            Not have an account?{' '}
                            <Button
                                variant="text"
                                onClick={() => router.push('/register')}
                            >
                                REGISTER
                            </Button>
                        </Typography>
                    </StyledForm>
                </CardContent>
            </MotionCard>
        </PageWrapper>
    );
}