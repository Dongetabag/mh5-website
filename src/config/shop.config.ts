/**
 * Shop Configuration
 * Configure your shop integration settings here
 */

export const shopConfig = {
  // WooCommerce Subdomain (when using WooCommerce bridge)
  // Set this to your WooCommerce shop subdomain once created
  woocommerceUrl: process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || 'https://shop.therealmh5.com',
  
  // Shop Type: 'woocommerce' | 'tapstitch-api' | 'custom'
  // Change this based on your integration method
  shopType: (process.env.NEXT_PUBLIC_SHOP_TYPE || 'woocommerce') as 'woocommerce' | 'tapstitch-api' | 'custom',
  
  // Redirect to WooCommerce shop
  redirectToWooCommerce: process.env.NEXT_PUBLIC_SHOP_TYPE !== 'tapstitch-api',
}

