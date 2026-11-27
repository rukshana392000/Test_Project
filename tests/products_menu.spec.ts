import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/login_functionality';
import { ProductsMenuPage } from '../Pages/products_menu';


test.describe('Products menu', () =>  {
    
    let loginPage: LoginPage;
    let productsMenu: ProductsMenuPage;

    const menuItems = [ 
        'All Items', 
        'Dynamic Catalog', 
        'About', 
        'Logout', 
        'Reset App State',
        'Close Menu'];

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        productsMenu = new ProductsMenuPage(page);

        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');

        await expect(loginPage.productsTitle).toBeVisible();
    });

    test('Test_022',async ({ page }) => {
        await productsMenu.openMenu();

        for (const option of menuItems) {
            await expect(productsMenu.menu.getByText(option, { exact: true })).toBeVisible();
        }

        await productsMenu.closeMenu();
        await expect(productsMenu.allItemsOption).toBeHidden();

        await productsMenu.openMenu();
        await productsMenu.selectAllItems();

        await expect(productsMenu.productsTitle).toBeVisible();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('Test_023',async ({page})=>{
        await productsMenu.openMenu();

        await expect(productsMenu.menuControls).toHaveCount(menuItems.length);

        for (const option of menuItems) {
            await expect(productsMenu.menu.getByText(option, { exact: true })).toBeVisible();
        }
    });

    test('Test_024', async()=>{
        const dynamicCatalogOptions = [
            'Lazy Load',
            'Spinner',
            'Slider'
        ];

        await productsMenu.openMenu();
        await productsMenu.openDynamicCatalog();

        await expect(productsMenu.dynamicCatalogSubmenu).toBeVisible();
        await expect(productsMenu.dynamicCatalogSubmenuOptions)
            .toHaveCount(dynamicCatalogOptions.length);

        for (const option of dynamicCatalogOptions) {
            await expect(
                productsMenu.dynamicCatalogSubmenu.getByText(option, { exact: true })
            ).toBeVisible();
        }
    });

});
