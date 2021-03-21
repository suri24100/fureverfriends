import scrapy, time
from scrapy.http import Request
import json
f = open('petfinderscraper/spiders/petfinder-urldata.json', )
data = json.load(f)
# print("THIS IS HOW MANY URLS ==>{}".format(len(data['urls'])))

class PetfinderbotSpider(scrapy.Spider):
    name = 'petfinderbot'
    allowed_domain = ['https://www.petfinder.com/']
    start_urls = data['urls']

    def parse(self, response):
        # Extracting the content using css selectors
        scraped_info = {}
        scraped_info['pet_id'] = response.css('pf-ensighten::attr(animal-id)').get()
        scraped_info['description'] = [word.strip() for word in response.css(r'div[class="card-section"] div[class="u-vr4x"]::text').extract()]
        # yield or give the scraped info to scrapy
        yield scraped_info