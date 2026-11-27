import { Locator, Page } from '@playwright/test';

export class ProductsMenuPage {
  readonly page: Page;
  readonly productsTitle: Locator;
  readonly menu: Locator;
  readonly menuControls: Locator;
  readonly openMenuButton: Locator;
  readonly closeMenuButton: Locator;
  readonly allItemsOption: Locator;
  readonly dynamicCatalogOption: Locator;
  readonly dynamicCatalogSubmenu: Locator;
  readonly dynamicCatalogSubmenuOptions: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsTitle = page.getByText('Products', { exact: true });
    this.menu = page.locator('.bm-menu-wrap');
    this.menuControls = this.menu.locator('a, button');
    this.openMenuButton = page.getByRole('button', { name: 'Open Menu' });
    this.closeMenuButton = page.getByRole('button', { name: /close menu/i });

    // These data-test selectors are shown in your Playwright error output.
    this.allItemsOption = page.locator('[data-test="inventory-sidebar-link"]');
    this.dynamicCatalogOption = page.locator(
      '[data-test="dynamic-catalog-sidebar-link"]'
    );
    this.dynamicCatalogSubmenu = page.locator(
      '[data-test="dynamic-catalog-submenu"]'
    );
    this.dynamicCatalogSubmenuOptions =
      this.dynamicCatalogSubmenu.locator('a, button');
  }

  async openMenu() {
    await this.openMenuButton.click();
  }

  async closeMenu() {
    await this.closeMenuButton.click();
  }

  async selectAllItems() {
    await this.allItemsOption.click();
  }

  async openDynamicCatalog() {
    await this.dynamicCatalogOption.click();
  }
}