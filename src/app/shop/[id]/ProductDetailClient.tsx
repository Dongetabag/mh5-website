'use client'

/**
 * PRODUCT DETAIL PAGE - Client Component
 * Individual product page with easy size and design picker
 */

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { getProductById, type Product } from '@/data/products'
import { useCart } from '@/context/CartContext'

export default function ProductDetailClient({ productId }: { productId: number }) {
