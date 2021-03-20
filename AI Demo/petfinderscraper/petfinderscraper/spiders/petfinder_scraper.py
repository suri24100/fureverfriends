import scrapy

class PetfinderbotSpider(scrapy.Spider):
    name = 'petfinderbot'
    allowed_domain = ['https://www.petfinder.com/']
    start_urls = ['https://www.petfinder.com/dog/mandy-50405545/pa/harrisburg/adopt-a-boxer-rescue-pa388/']

    def parse(self, response):
        # Extracting the content using css selectors
        description = response.css(r'div[class="card-section"] div[class="u-vr4x"]::text').extract()

        scraped_info = {}
        scraped_info['description'] = description


        # # Give the extracted content row wise
        # for item in zip(description):
        #     # create a dictionary to store the scraped info
        #     scraped_info = {
        #         'description': item[0],
        #     }

        # yield or give the scraped info to scrapy
        yield scraped_info