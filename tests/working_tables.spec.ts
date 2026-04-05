import { test, expect } from '@playwright/test';

test('Working with tables', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-table/');

    const table = await page.locator('xpath=//table[@id="courses_table"]');
    const rows = await table.locator('xpath=.//tr').all();
    console.log(`Number of rows: ${rows.length}`);

    const courses: Course[] = [];
    for (let row of rows) {
        let course: Course = {
            name: await row.locator('xpath=.//td[2]').innerText(),
            language: await row.locator('xpath=.//td[3]').innerText(),
            level: await row.locator('xpath=.//td[4]').innerText(),
            //enrollment: await row.locator('xpath=.//td[5]').innerText(),
            //link: await row.locator('xpath=.//td[6]').innerText(),
        }

        //Mapea los elementos al objeto Course
        courses.push(course);
    }

    /* for (let listCourses of courses) {
        console.log(listCourses);
    } */

    //Obtiene el curso de Selenium
    const seleniumCourse = courses.find(course => course.name === 'Selenium Framework');
    console.log(seleniumCourse);

    const row1 = rows.at(1);
    const courseName = await row1?.locator('xpath=.//td[2]').innerText();
    const courseLanguage = await row1?.locator('xpath=.//td[3]').innerText();
    const courseLevel = await row1?.locator('xpath=.//td[4]').innerText();
    //console.log(courseName, courseLanguage, courseLevel);

});

interface Course {
    name: string;
    language: string;
    level: string;
    //enrollment: string;
    //link: string;
}