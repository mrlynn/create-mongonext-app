"use client";
import React, { useState } from "react";
import { Button, Typography, Box, CircularProgress, Alert } from "@mui/material";

const checkIndex = async () => {
  const res = await fetch("/api/rag-settings/vector-index");
  return res.json();
};

const createIndex = async () => {
  const res = await fetch("/api/rag-settings/vector-index", { method: "POST" });
  return res.json();
};

export default function RagSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [indexExists, setIndexExists] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleCheck = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const data = await checkIndex();
      setIndexExists(data.exists);
      setMessage(data.exists ? "Vector index exists." : "Vector index does not exist.");
    } catch (err) {
      setError("Failed to check index.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const data = await createIndex();
      if (data.success) {
        setIndexExists(true);
        setMessage("Vector index created successfully.");
      } else {
        setError(data.error || "Failed to create index.");
      }
    } catch (err) {
      setError("Failed to create index.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 6, p: 3, boxShadow: 2, borderRadius: 2, bgcolor: "background.paper" }}>
      <Typography variant="h5" gutterBottom>
        RAG Vector Index Settings
      </Typography>
      <Button variant="contained" onClick={handleCheck} disabled={loading} sx={{ mb: 2 }}>
        Check Vector Index
      </Button>
      {loading && <CircularProgress size={24} sx={{ ml: 2 }} />}
      {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      {indexExists === false && (
        <Button variant="outlined" color="primary" onClick={handleCreate} disabled={loading} sx={{ mt: 2 }}>
          Create Vector Index
        </Button>
      )}
    </Box>
  );
} 