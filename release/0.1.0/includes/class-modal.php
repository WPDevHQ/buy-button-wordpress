<?php
/**
 * Shopify eCommerce Plugin - Shopping Cart Modal
 * @version 0.1.0
 * @package Shopify eCommerce Plugin - Shopping Cart
 */

class SECP_Modal {
	/**
	 * Parent plugin class
	 *
	 * @var   class
	 * @since NEXT
	 */
	protected $plugin = null;

	/**
	 * Constructor
	 *
	 * @since  NEXT
	 * @param  object $plugin Main plugin object.
	 */
	public function __construct( $plugin ) {
		$this->plugin = $plugin;
	}

	/**
	 * Get the buy button creation modal
	 *
	 * @since NEXT
	 * @return string HTML markup of modal.
	 */
	public function get_modal() {
		$iframe_url = 'https://widgets.shopifyapps.com/embed_admin/embeds/picker';

		$site = get_option( 'secp-connected-site', false );
		if ( $site ) {
			$iframe_url = add_query_arg( 'shop', $site, $iframe_url );
		}

		$iframe_url = apply_filters( 'secp_modal_iframe_url', $iframe_url, $site );

		ob_start();
		?>
		<div class="secp-modal-wrap">
			<div class="secp-modal">
				<div class="secp-modal-close"><div class="screen-reader-text"><?php esc_attr_e( 'Close', 'shopify-ecommerce-plugin-shopping-cart' ); ?></div></div>
				<iframe src="<?php echo esc_url( $iframe_url ); ?>" frameborder="0" class="secp-modal-iframe"></iframe>
				<div class="secp-modal-secondpage">
					<div class="secp-modal-header">
						<h2><?php esc_html_e( 'Embed Type', 'shopify-ecommerce-plugin-shopping-cart' ); ?></h2>
					</div>
					<div class="secp-modal-content">
						<label class="secp-show-label">
							<span class="secp-show-preview">
								<img src="<?php echo esc_url( $this->plugin->url( 'assets/images/type-all.svg' ) ); ?>">
							</span>
							<input class="secp-show" type="radio" name="secp-show" value="all" checked="checked">
							<?php esc_html_e( 'Product image, price and button', 'shopify-ecommerce-plugin-shopping-cart' ); ?>
						</label>
						<label class="secp-show-label">
							<span class="secp-show-preview">
								<img src="<?php echo esc_url( $this->plugin->url( 'assets/images/type-button-only.svg' ) ); ?>">
							</span>
							<input class="secp-show" type="radio" name="secp-show" value="button-only">
							<?php esc_html_e( 'Buy button only', 'shopify-ecommerce-plugin-shopping-cart' ); ?>
						</label>
					</div>
					<div class="secp-modal-footer">
						<button class="button button-primary secp-modal-add-button"><?php esc_html_e( 'Ok', 'shopify-ecommerce-plugin-shopping-cart' ); ?></button>
					</div>
				</div>
			</div>
			<div class="secp-modal-background"></div>
		</div>
		<?php
		return ob_get_clean();
	}
}