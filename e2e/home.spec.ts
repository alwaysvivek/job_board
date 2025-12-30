import { test, expect } from '@playwright/test'

test.describe('Job Board Home Page', () => {
  test('should display the homepage', async ({ page }) => {
    await page.goto('/')
    
    // Check for main heading
    await expect(page.getByRole('heading', { name: /Find Your Next Opportunity/i })).toBeVisible()
    
    // Check for navigation
    await expect(page.getByRole('banner')).toBeVisible()
    await expect(page.getByRole('link', { name: /Job Board/i })).toBeVisible()
  })

  test('should have filter buttons', async ({ page }) => {
    await page.goto('/')
    
    // Check for filter navigation
    const filterNav = page.getByRole('navigation', { name: /Job type filters/i })
    await expect(filterNav).toBeVisible()
    
    // Check for job type filters
    await expect(filterNav.getByRole('link', { name: 'All Jobs' })).toBeVisible()
    await expect(filterNav.getByRole('link', { name: 'Full-time' })).toBeVisible()
    await expect(filterNav.getByRole('link', { name: 'Part-time' })).toBeVisible()
  })

  test('should navigate to sign in page', async ({ page }) => {
    await page.goto('/')
    
    await page.getByRole('link', { name: 'Sign In' }).click()
    
    await expect(page).toHaveURL('/auth/signin')
    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible()
  })
})
