import React, { useState } from "react";
import styled from "styled-components";
import {
    Box,
    Button,
    Typography,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const TypeList = styled(Box)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const TypeBtn = styled(Button)`
  border: 2px solid ${({ selected }) => (selected ? "#1976d2" : "#ccc")};
  color: ${({ selected }) => (selected ? "#1976d2" : "inherit")};
`;

const FileRow = styled(Box)`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export default function FileImporter({
    types,           // [{ label: "Type 1", sampleUrl: "https://..." }, …]
    accept = ".csv,.xlsx",
    onImport,        // fn({ type, file })
    onClose,         // optional fn()
}) {
    const [selectedIdx, setSelectedIdx] = useState(null);
    const [file, setFile] = useState(null);

    const handleFile = (e) => {
        setFile(e.target.files[0] || null);
    };

    const handleImport = () => {
        if (selectedIdx == null || !file) return;
        onImport({ type: types[selectedIdx].label, file });
    };

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="h6">Import File</Typography>
                {onClose && (
                    <IconButton size="small" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                )}
            </Box>

            <Typography gutterBottom>Chọn loại file:</Typography>
            <TypeList>
                {types.map((t, i) => (
                    <TypeBtn
                        key={i}
                        variant="outlined"
                        size="small"
                        selected={i === selectedIdx}
                        onClick={() => setSelectedIdx(i === selectedIdx ? null : i)}
                    >
                        {t.label}
                    </TypeBtn>
                ))}
            </TypeList>

            {selectedIdx != null && (
                <Box mb={2}>
                    <Button
                        component="a"
                        href={types[selectedIdx].sampleUrl}
                        target="_blank"
                        size="small"
                    >
                        Tải mẫu: {types[selectedIdx].label}
                    </Button>
                </Box>
            )}

            <Typography gutterBottom>Chọn file để import:</Typography>
            <FileRow>
                <input
                    type="file"
                    id="file-import"
                    accept={accept}
                    style={{ display: "none" }}
                    onChange={handleFile}
                />
                <label htmlFor="file-import">
                    <Button variant="contained" component="span" size="small">
                        Chọn tệp…
                    </Button>
                </label>
                <Typography variant="body2" style={{ fontStyle: "italic" }}>
                    {file ? file.name : "Chưa có tệp nào"}
                </Typography>
            </FileRow>

            <Box display="flex" gap={2} mt={3}>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={onClose}
                    sx={{ flex: 1 }}
                >
                    Hủy
                </Button>
                <Button
                    variant="contained"
                    size="small"
                    onClick={handleImport}
                    disabled={selectedIdx == null || !file}
                    sx={{ flex: 1 }}
                >
                    Import
                </Button>
            </Box>
        </Box>
    );
}
