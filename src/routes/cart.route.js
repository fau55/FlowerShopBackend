import { Router } from "express";
import { getAllCarts, addItemsInCart, getCartByCartId, deleteCartItemByItemId, updateItemById, deleteCartById } from '../controllers/cart.controller.js'

const router = Router();

router.route('get-cart-by/:cartId').get(getCartByCartId);
router.route('add-item/:cartId').post(addItemsInCart);
router.route('get-all').get(getAllCarts);
router.route('delete-cart-item/:itemId').delete(deleteCartItemByItemId);

router.route('update-item-quantity/:cartId').post(updateItemById);
router.route('delete-cart/:cart_id').delete(deleteCartById);

export default router;
