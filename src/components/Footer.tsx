import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { GitHub } from '@mui/icons-material';

export default function Footer() {
  return (
    <footer className="py-4">
      <div className="text-center">
        Copyright © {new Date().getFullYear()} — <strong>Pais</strong>
      </div>
    </footer>
  );
}
