'use client'
import { useRotiseriaStore } from '@/store'
import React from 'react'

export const ColorActual = () => {
    const { rotiseriaActive } = useRotiseriaStore();
    return (
        <p>Color Actual: {rotiseriaActive?.color}</p>
    )
}
