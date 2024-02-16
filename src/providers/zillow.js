import axios from "axios";
import * as cheerio from "cheerio";


// IF THERES no response, change the cookie.
export default class Zillow {
  constructor() {
    this.name = 'Zillow';
    this.url = "https://www.zillow.com/"
    this.path = "/rentals/"
    this.boroughs = {
      "brooklyn": "brooklyn-new-york-ny",
      "queens": "queens-new-york-ny",
      "manhattan": "manhattan-new-york-ny",
      "bronx": "bronx-new-york-ny",
      "statenisland": "staten-island-new-york-ny"
    }
  }

  async getRentals(borough) {
    try {
      const response = await axios.get(this.url + this.boroughs[borough] + this.path, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
          "Cookie": `optimizelyEndUserId=oeu1708117936460r0.945142324968502; pjs-last-visited-page=/research/data/; pjs-pages-visited=1; zgcus_aeut=AEUUT_0fecc529-cd10-11ee-82c9-82f279c89f52; zgcus_aeuut=AEUUT_0fecc529-cd10-11ee-82c9-82f279c89f52; zguid=24|%24729de6f5-4930-4026-b3d8-2e9298337157; zgsession=1|79f16f24-57f6-4b20-9bac-a486251607e6; _ga=GA1.2.745353641.1708117937; _gid=GA1.2.1967659564.1708117937; pxcts=103c4194-cd10-11ee-aa3d-f9e3d787cb8b; _pxvid=103c3524-cd10-11ee-aa3d-d9f345282865; zjs_anonymous_id=%22729de6f5-4930-4026-b3d8-2e9298337157%22; zjs_user_id=null; zg_anonymous_id=%225b7cfff9-c5e2-4bb7-bc75-92e9f8c2a8a7%22; _gcl_au=1.1.531667221.1708117938; DoubleClickSession=true; __pdst=8808089f26d446dfa6cbb7bdffa0c9d1; _pin_unauth=dWlkPU9UZzBObUZtTUdJdFpXRTVZUzAwTlRnM0xXSm1OMll0TmpoaU4yUmtOVFV5Tm1Wag; _clck=q20lg8%7C2%7Cfjb%7C0%7C1507; JSESSIONID=40317FC4D4FEE5BD9DDD690B9FABE63D; _hp2_id.1215457233=%7B%22userId%22%3A%22972551522396239%22%2C%22pageviewId%22%3A%228776180268384239%22%2C%22sessionId%22%3A%221160081021417343%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; FSsampler=439604831; AWSALB=bJ2ofvEf1mr2asNw+TW77rQPZVplsRVJOiHd/xIOMpuBEiT8Em70kRn/LAhQtBNb9E6FelnZ0Z569hEfcfpEss2mfbkN6uZLFZrYDJlH/LwUX8H19BRqeFcT3bSA; AWSALBCORS=bJ2ofvEf1mr2asNw+TW77rQPZVplsRVJOiHd/xIOMpuBEiT8Em70kRn/LAhQtBNb9E6FelnZ0Z569hEfcfpEss2mfbkN6uZLFZrYDJlH/LwUX8H19BRqeFcT3bSA; _uetsid=10cad2f0cd1011ee8db51db2f42b0823; _uetvid=10cb0580cd1011ee8826a1a50074817c; search=6|1710715245685%7Crect%3D40.877483%2C-73.910408%2C40.683935%2C-74.047237%26rid%3D37607%26disp%3Dmap%26mdm%3Dauto%26p%3D1%26z%3D0%26listPriceActive%3D1%26type%3Dhouse%2Ccondo%2Ctownhouse%2Capartment%26fs%3D0%26fr%3D1%26mmm%3D0%26rs%3D0%26ah%3D0%26singlestory%3D0%26housing-connector%3D0%26abo%3D0%26garage%3D0%26pool%3D0%26ac%3D0%26waterfront%3D0%26finished%3D0%26unfinished%3D0%26cityview%3D0%26mountainview%3D0%26parkview%3D0%26waterview%3D0%26hoadata%3D1%26zillow-owned%3D0%263dhome%3D0%26featuredMultiFamilyBuilding%3D0%26student-housing%3D0%26income-restricted-housing%3D0%26military-housing%3D0%26disabled-housing%3D0%26senior-housing%3D0%26excludeNullAvailabilityDates%3D0%26isRoomForRent%3D0%26isEntirePlaceForRent%3D1%26commuteMode%3Ddriving%26commuteTimeOfDay%3Dnow%09%0937607%09%7B%22isList%22%3Atrue%2C%22isMap%22%3Afalse%7D%09%09%09%09%09; _clsk=1rtfu4c%7C1708123247085%7C58%7C0%7Ct.clarity.ms%2Fcollect; _px3=5565c924bd9a73f1094f80743fa15c2a29a20907b9ea60f705717285d9f2c862:XoID045ecFWcIyKL+WS/4+O/lNkNkGlaPQVWMHU1hW44zrMvQ6ewecxIyGjGvazCDKZbdksJAEUbkJxJ8xs9sQ==:1000:sxrHzsfjyc70+Gys+QPW6ey9bzVgBmQ+/AZ6XevpT0rU7iYxNcPLMmDdOf3yqWXJ4fvGgxzBqR0fkazs5hFSJAEADQNcfILAU+heBzyaVKpOLfKQNjCLF53dcW2ysUTB/fUmhE1zG7N/58ZLYaTeVKjl/ADNvhSMk33IkeH0+hvzcnjfhwNBAstMzK8d+cOzxCdoUcpVVmG9i/9mW5DJO/+DSDqD/4le0dbpPtfN0cg=`,
          "Accept-Language": "en-US,en;q=0.9"
        }
      });
      const $ = cheerio.load(response.data);

      const script = $("#__NEXT_DATA__").get()
      // access the data from the script tag
      const json = JSON.parse(script[0].children[0].data); 
      const searchPageState = json.props.pageProps.searchPageState;
      let listings = searchPageState.cat1.searchResults.listResults;

      return listings.map((listing) => {
        return {
          id: listing.id,
          address: listing.address,
          price: listing.price ?? listing.units[0].price ?? "N/A",
          images: listing.carouselPhotos.map((photo) => photo.url),
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

}