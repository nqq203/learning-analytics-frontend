'use client'

import React, { useState } from 'react'
import styled from 'styled-components'
import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    InputAdornment,
    IconButton,
    CircularProgress,
    MenuItem
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { register } from '@/redux/thunk/authThunk'
import { toast } from 'react-toastify'
import Image from 'next/image'

const MotionMuiCard = motion(Card)

const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    var(--blue-100) 0%,
    var(--purple-100) 100%
  );
  padding: 1rem;
`

const MotionCard = styled(MotionMuiCard)`
  width: 100%;
  max-width: 700px;
  border-radius: 16px;
  padding: 1.5rem;
  background-color: rgba(255,255,255,0.9) !important;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.25);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 32px rgba(0,0,0,0.15);
  }
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

const textFieldSx = {
    '& .MuiOutlinedInput-root': {
        backgroundColor: 'var(--white)',
        borderRadius: 4,              // whatever rounding you like

        // when that root also has Mui-focused…
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--purple-700)',
            borderWidth: 2,
        },
    },

    '& .MuiInputLabel-root': {
        color: 'var(--grey-700)',
    },
    // label when the field is focused
    '& .MuiInputLabel-root.Mui-focused': {
        color: 'var(--purple-700)',
    },
}

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`

export default function RegisterForm() {
    const dispatch = useDispatch()
    const router = useRouter()
    const { loading } = useSelector(s => s.auth)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [showPwd, setShowPwd] = useState(false)
    const [role, setRole] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
        if (!name || !email || !password) {
            toast.warning('Vui lòng điền đầy đủ thông tin')
            return
        }
        if (password !== confirm) {
            toast.warning('Mật khẩu không khớp')
            return
        }

        try {
            const res = await dispatch(register({ fullName: name, email, password, role }));
            console.log(res);
            if (res.payload.success) {
                toast.success(res.payload.message);
                router.replace("/login");
            }
            toast.error(res.payload);
        } catch (err) {
            toast.error(err.message || 'Đăng ký thất bại')
        }
    }

    return (
        <PageWrapper>
            <MotionCard
                elevation={0}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            >
                <CardContent>
                    <Header>
                        <Image alt='logo' src="/images/logo.png" width={100} height={100} />
                        <Typography
                            variant="h3"
                            align="center"
                            gutterBottom
                            sx={{ color: 'var(--black)', letterSpacing: 1.2 }}
                        >
                            ĐĂNG KÝ
                        </Typography>
                    </Header>

                    <StyledForm onSubmit={handleSubmit}>
                        <TextField
                            label="Họ và tên"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            fullWidth
                            variant="outlined"
                            sx={textFieldSx}
                        />

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
                            select
                            label="Vai trò"
                            value={role}
                            onChange={e => setRole(e.target.value)}
                            fullWidth
                            variant="outlined"
                            sx={textFieldSx}
                            SelectProps={{}}
                        >
                            <MenuItem value="instructor">Giảng viên</MenuItem>
                            <MenuItem value="student" disabled>
                                Sinh viên (chưa mở)
                            </MenuItem>
                        </TextField>

                        <TextField
                            label="Mật khẩu"
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

                        <TextField
                            label="Xác nhận mật khẩu"
                            type={showPwd ? 'text' : 'password'}
                            value={confirm}
                            onChange={e => setConfirm(e.target.value)}
                            fullWidth
                            variant="outlined"
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
                            sx={textFieldSx}
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
                                    backgroundColor: 'var(--secondary-500)',
                                    color: 'var(--white)',
                                    fontWeight: 600,
                                    '&:hover': { backgroundColor: 'var(--secondary-700)' }
                                }}
                            >
                                {loading
                                    ? <CircularProgress size={24} color="white" />
                                    : 'Đăng ký'}
                            </Button>
                        </motion.div>

                        <Typography align="center" sx={{ mt: 2 }}>
                            Đã có tài khoản?{' '}
                            <Button
                                variant="text"
                                onClick={() => router.push('/login')}
                            >
                                Đăng nhập
                            </Button>
                        </Typography>
                    </StyledForm>
                </CardContent>
            </MotionCard>
        </PageWrapper>
    )
}