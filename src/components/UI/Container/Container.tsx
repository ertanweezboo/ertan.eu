'use client';

import React from 'react';
import styles from './Container.module.css';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
    fullWidth?: boolean;
}

export default function Container({ children, className = '', fullWidth = false }: ContainerProps) {
    return (
        <div className={`${styles.container} ${fullWidth ? styles.fullWidth : ''} ${className}`}>
            {children}
        </div>
    );
}
