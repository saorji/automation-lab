const {Builder, Capabilities, By} = require('selenium-webdriver')

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeEach(async() => {
    await driver.get('http://localhost:5501/movieList/index.html')
})

afterAll(async() => {
    await driver.quit()
})

describe('movie-list testing', () => {
    test('test if movie add button works', async() => {
        await driver.findElement(By.xpath('//input')).sendKeys('Ghost town\n')
        await driver.findElement(By.xpath('//input')).sendKeys('Ghost town 2\n')
        await driver.findElement(By.xpath('//input')).sendKeys('Ghost town 3\n')
        await driver.findElement(By.xpath('//input')).sendKeys('Ghost town 4\n')
        await driver.findElement(By.xpath('//input')).sendKeys('Ghost town 5\n')
        await driver.sleep(2000)
        const movie = await driver.findElement(By.xpath('//li'))
        const displayed = movie.isDisplayed()
        expect(displayed).toBeTruthy()
    
    })

    test('crossing off a movie message',async()=>{
        await driver.findElement(By.xpath('//input')).sendKeys('Ghost town\n')
        await driver.findElement(By.xpath('//li//span')).click()
        let message = await driver.findElement(By.id("message")).getText()
        await driver.sleep(2000)
        expect(message).toBe('Ghost town watched!')
    })
    
    test('crossing off a movie',async()=>{
        await driver.findElement(By.xpath('//input')).sendKeys('Ghost town 3\n')
        await driver.findElement(By.xpath('//li//span')).click()
        await driver.sleep(2000)
        let checked = await driver.findElement(By.xpath('//li//span')).getAttribute('class')
        expect(checked).toBe('checked')
    })

    test('deleting a movie',async()=>{
        await driver.findElement(By.xpath('//input')).sendKeys('Ghost town 2\n')
       // await driver.findElement(By.id("Ghost town 2")).click()
        await driver.sleep(2000)
        movies = await driver.findElement(By.xpath('//ul')).getText()
        movies = movies.split('x\n')
        //console.log(movies)
        let existing = movies.includes('Ghost town 2')
        expect(existing).toBeFalsy()
    })  
    
    
    
    // test('test if movie deleted button works', async() => {
    //     //await driver.findElement(By.xpath('//input')).sendKeys('GreatDay')
    //     await driver.findElement(By.xpath('//button')).click()
    //     await driver.findElement(By.xpath('//li/button')).click()
    //     await driver.sleep(3000)
        
    // })

    // test('test if crossed word works', async() => {
    //    // await driver.findElement(By.xpath('//input')).sendKeys('TODay')
    //     await driver.findElement(By.xpath('//button')).click()
    //     await driver.findElement(By.xpath('//span')).click()
    //     await driver.sleep(3000)
    // })

    // test('test if notification display works', async() => {
    //     //await driver.findElement(By.xpath('//input')).sendKeys('Tuesday')
    //     await driver.findElement(By.xpath('//button')).click()
    //     await driver.findElement(By.xpath('//span')).click()
    //     await driver.findElement(By.xpath('//aside'))
    //     await driver.sleep(3000)
    // })
  
})
