// ImportFileModal.jsx
import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    Button,
    Box,
    IconButton,
    Typography,
    CircularProgress,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import styled from "styled-components";
import { useSelector } from "react-redux";

const TypeList = styled(Box)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const TypeBtn = styled(Button)`
  border: 2px solid
    ${({ selected }) => (selected ? "#1976d2" : "#ccc")} !important;
  background-color: ${({ selected }) =>
        selected ? "#1976d2" : "transparent"} !important;
  color: ${({ selected }) => (selected ? "#fff" : "inherit")} !important;
`;

export default function ImportFileModal({
    open,
    setOpen,
    types = [],      // e.g. ["Lớp/Khóa học", "Toàn bộ"]
    sampleLinks = [],
    onImport,        // fn(type, file)
}) {
    const [typeChosen, setTypeChosen] = useState(null);
    const [file, setFile] = useState(null);
    const { loading } = useSelector(state => state.data);

    // reset when modal opens
    useEffect(() => {
        if (open) {
            setTypeChosen(null);
            setFile(null);
        }
    }, [open]);

    const close = () => setOpen(false);

    return (
        <Dialog open={open} onClose={close} fullWidth maxWidth="sm">
            <Box display="flex" justifyContent="space-between" p={2}>
                <Typography variant="h6">Nhập dữ liệu bằng file</Typography>
                <IconButton onClick={close}>
                    <Close />
                </IconButton>
            </Box>

            <DialogContent>
                <Typography gutterBottom>Chọn loại import:</Typography>
                <TypeList>
                    {types.map((t, i) => (
                        <TypeBtn
                            key={i}
                            variant="outlined"
                            size="small"
                            selected={i === typeChosen}
                            onClick={() =>
                                setTypeChosen(i === typeChosen ? null : i)
                            }
                        >
                            {t}
                        </TypeBtn>
                    ))}
                </TypeList>

                {/* Download sample link */}
                {typeChosen != null && sampleLinks[typeChosen] && (
                    <Box mb={2}>
                        <Button
                            component="a"
                            href={sampleLinks[typeChosen]}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            size="small"
                        >
                            📥 Tải mẫu: {types[typeChosen]}
                        </Button>
                    </Box>
                )}

                <Typography gutterBottom>Chọn file:</Typography>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <input
                        id="file-import"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(e) => setFile(e.target.files[0] ?? null)}
                    />
                    <label htmlFor="file-import">
                        <Button component="span" size="small">
                            Chọn tệp…
                        </Button>
                    </label>
                    <Typography
                        variant="body2"
                        sx={{ fontStyle: "italic", flex: 1 }}
                    >
                        {file?.name ?? "Chưa có tệp nào"}
                    </Typography>
                </Box>

                <Box display="flex" gap={2} mt={2}>
                    <Button fullWidth variant="outlined" onClick={close}>
                        Hủy
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        disabled={typeChosen == null || !file || loading}
                        onClick={() =>
                            onImport(types[typeChosen], file)
                        }
                    >
                        {loading
                            ? <CircularProgress size={24} color="white" />
                            : 'Nhập'}
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
