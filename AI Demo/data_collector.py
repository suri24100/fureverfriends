import scrapy

class PetfinderbotSpider(scrapy.Spider):
    name = 'petfinderbot'
    allowed_domain = ['https://www.petfinder.com/']
    start_urls = ['https://www.petfinder.com/dog/mandy-50405545/pa/harrisburg/adopt-a-boxer-rescue-pa388/']

    def parse(self, response):
        # Extracting the content using css selectors
        pet_id = response.css('.title.may-blank::text').extract()
        description = response.css('.score.unvoted::text').extract()
        tags = response.css('time::attr(title)').extract()
        comments = response.css('.comments::text').extract()

        # Give the extracted content row wise
        for item in zip(pet_id, description, tags, comments):
            # create a dictionary to store the scraped info
            scraped_info = {
                'pet_id': item[0],
                'description': item[1],
                'tags': item[2],
                'comments': item[3],
            }

            # yield or give the scraped info to scrapy
            yield scraped_info