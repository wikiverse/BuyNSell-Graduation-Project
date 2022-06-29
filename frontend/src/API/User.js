const host = 'http://localhost:4001';
// cookies don't work outside localhost
// http://localhost:4001
//'http://192.168.0.2:4001'
export const signUpUrl = host + '/user/signup';
export const signInUrl = host + '/user/signin';
export const userInfoUrl = host + '/user/userinfo';
export const signOutUrl = host + '/user/signout';
export const allProducts = host + '/product/all';
export const socketUrl = host;
export const isSignedUrl = host + '/user/issigned';
export const productUrl = host + '/product';
export const recommendedProducts = host + '/product/record';
export const searchProduct = host + '/product/search';
//http://localhost:4001/product/
//http://localhost:4001/user/issigned
