import { BasePage } from "./BasePage";

export class DashboardPage extends BasePage {
    // Initialize locators in constructor

    constructor(page) {
        super(page); // Initializes page
        this.dashboardTitle = page.getByRole('heading', {name: 'Dashboard'}); // Locates title 'Dashboard'
        this.timeAtWork = page.getByText('Time at Work'); // Locates tite 'Time at Work'
        // Quick Launch selectors

        this.assignLeave = page.getByRole('button', {name: 'Assign Leave'});
        this.leaveList = page.getByRole('button', {name: 'Leave List'});
        this.timeSheets = page.getByRole('button', {name: 'Timesheets'});
        this.applyLeave = page.getByRole('button', {name: 'Apply Leave'});
        this.myLeave = page.getByRole('button', {name: 'My Leave'});
        this.myTimesheet = page.getByRole('button', {name: 'My Timesheet'});
    };


}