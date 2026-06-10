import { BasePage } from "./BasePage";

export class DashboardPage extends BasePage {
    // Initialize locators in constructor

    constructor(page) {
        super(page); // Initializes page
        this.dashboardTitle = page.getByRole('heading', {name: 'Dashboard'}); // Locates title 'Dashboard'
        this.timeAtWork = page.getByText('Time at Work'); // Locates widget 'Time at Work'
                
        this.myActions = page.getByText('My Actions'); // Locates widget "My Actions"

        this.latestPosts = page.getByText('Buzz Latest Posts'); // Locates widget "Buzz Latest Posts"

        this.quickLaunch = page.getByText('Quick Launch'); // Locates widget "Quick Launch"

        this.buzzLatestPosts = page.getByText('Buzz Latest Posts'); // Locates widget "Buzz Latest Posts"

        this.employeesOnLeave = page.getByText('Employees on Leave Today'); // Locates widget "Employees on Leave Today"

        this.employeeDistributionSubUnit = page.getByText('Employee Distribution by Sub Unit'); // Locates widget "Employee Distribution by Sub Unit"

        this.employeeDistributionLocation = page.getByText('Employee Distribution By Location'); // Locates widget "Employee Distribution by Location"
    };


}