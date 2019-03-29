var sources = [
    { 
        image: 'https://img.buzzfeed.com/buzzfeed-static/static/2018-12/16/16/enhanced/buzzfeed-prod-web-06/enhanced-8749-1544995921-7.jpg?downsize=800:*&output-format=auto&output-quality=auto',
        title: 'Peter Pan'
    },
    { 
        image: 'https://img.buzzfeed.com/buzzfeed-static/static/2018-07/30/11/enhanced/buzzfeed-prod-web-04/enhanced-16878-1532964946-9.jpg?downsize=800:*&output-format=auto&output-quality=auto',
        title: 'The Incredibles'
    },
    { 
        image: 'https://img.buzzfeed.com/buzzfeed-static/static/2018-09/13/12/enhanced/buzzfeed-prod-web-01/enhanced-5234-1536855014-1.jpg?downsize=800:*&output-format=auto&output-quality=auto',
        title: 'The Ring'
    },
    { 
        image: "https://img.buzzfeed.com/buzzfeed-static/static/2018-07/30/11/enhanced/buzzfeed-prod-web-04/enhanced-16849-1532964762-1.jpg?downsize=800:*&output-format=auto&output-quality=auto",
        title: 'Finding Nemo'
    },
    {
        image: "https://img.buzzfeed.com/buzzfeed-static/static/2018-01/17/5/enhanced/buzzfeed-prod-fastlane-01/enhanced-577-1516183928-4.jpg?downsize=800:*&output-format=auto&output-quality=auto",
        title: "Space Jam"
    },
    { 
        image: 'https://img.buzzfeed.com/buzzfeed-static/static/2018-07/30/11/enhanced/buzzfeed-prod-web-03/enhanced-3414-1532965064-1.jpg?downsize=800:*&output-format=auto&output-quality=auto',
        title: 'Toy Story 2'
    },
    { 
        image: 'https://img.buzzfeed.com/buzzfeed-static/static/2018-09/13/13/enhanced/buzzfeed-prod-web-01/enhanced-15566-1536859270-11.jpg?downsize=800:*&output-format=auto&output-quality=auto',
        title: 'Edward Scissorhands'
    },
    { 
        image: "https://img.buzzfeed.com/buzzfeed-static/static/2018-07/30/11/enhanced/buzzfeed-prod-web-02/enhanced-21741-1532964851-9.jpg?downsize=800:*&output-format=auto&output-quality=auto",
        title: 'Wall E'
    },
    { 
        image: 'https://img.buzzfeed.com/buzzfeed-static/static/2018-07/30/11/enhanced/buzzfeed-prod-web-02/enhanced-22031-1532965045-2.jpg?downsize=800:*&output-format=auto&output-quality=auto',
        title: 'Brave'
    },
    {
        image: 'https://img.buzzfeed.com/buzzfeed-static/static/2018-12/16/16/enhanced/buzzfeed-prod-web-01/enhanced-14589-1544994583-1.jpg?downsize=800:*&output-format=auto&output-quality=auto',
        title: 'Snow White and the Seven Dwarfs'
    },
    { 
        image: 'https://img.buzzfeed.com/buzzfeed-static/static/2018-09/13/16/enhanced/buzzfeed-prod-web-02/enhanced-11313-1536870145-7.jpg?downsize=800:*&output-format=auto&output-quality=auto',
        title: 'Die Hard'
    },
    {
        image: "https://img.buzzfeed.com/buzzfeed-static/static/2018-01/16/20/enhanced/buzzfeed-prod-fastlane-02/enhanced-20822-1516153733-3.jpg?downsize=800:*&output-format=auto&output-quality=auto",
        title: "Night at the Museum"
    },
    { 
        image: "https://img.buzzfeed.com/buzzfeed-static/static/2018-07/30/11/enhanced/buzzfeed-prod-web-03/enhanced-3221-1532964819-1.jpg?downsize=800:*&output-format=auto&output-quality=auto",
        title: 'Monsters University'
    },
    { 
        image: 'https://img.buzzfeed.com/buzzfeed-static/static/2018-12/16/16/enhanced/buzzfeed-prod-web-05/enhanced-10168-1544996773-1.jpg?downsize=800:*&output-format=auto&output-quality=auto',
        title: '101 Dalmatians'
    },
    { 
        image: 'https://img.buzzfeed.com/buzzfeed-static/static/2018-12/16/16/enhanced/buzzfeed-prod-web-06/enhanced-7509-1544994782-1.jpg?downsize=800:*&output-format=auto&output-quality=auto',
        title: 'Mulan'
    },
    { 
        image: 'https://img.buzzfeed.com/buzzfeed-static/static/2018-09/13/16/enhanced/buzzfeed-prod-web-04/enhanced-29293-1536870018-1.jpg?downsize=800:*&output-format=auto&output-quality=auto',
        title: 'The Breakfast Club'
    },
    { 
        image: 'https://img.buzzfeed.com/buzzfeed-static/static/2018-07/30/11/enhanced/buzzfeed-prod-web-06/enhanced-22925-1532965015-7.jpg?downsize=800:*&output-format=auto&output-quality=auto',
        title: 'Monsters Inc'
    },
    { 
        image: 'https://img.buzzfeed.com/buzzfeed-static/static/2018-07/30/11/enhanced/buzzfeed-prod-web-06/enhanced-22925-1532964997-1.jpg?downsize=800:*&output-format=auto&output-quality=auto',
        title: 'Coco'
    },
    { 
        image: 'https://img.buzzfeed.com/buzzfeed-static/static/2018-09/13/18/enhanced/buzzfeed-prod-web-06/enhanced-29329-1536876078-1.jpg?downsize=800:*&output-format=auto&output-quality=auto',
        title: 'A Clockwork Orange'
    },
    { 
        image: 'https://img.buzzfeed.com/buzzfeed-static/static/2018-12/16/16/enhanced/buzzfeed-prod-web-04/enhanced-7887-1544995461-1.jpg?downsize=800:*&output-format=auto&output-quality=auto',
        title: 'The Little Mermaid'
    },
    { 
        image: 'https://img.buzzfeed.com/buzzfeed-static/static/2018-09/13/10/enhanced/buzzfeed-prod-web-03/enhanced-11213-1536850713-2.jpg?downsize=800:*&output-format=auto&output-quality=auto',
        title: 'Get Out'
    },
    { 
        image: "https://img.buzzfeed.com/buzzfeed-static/static/2018-07/30/11/enhanced/buzzfeed-prod-web-03/enhanced-2990-1532964878-1.jpg?downsize=800:*&output-format=auto&output-quality=auto",
        title: 'Inside Out'
    },
    { 
        image: 'https://img.buzzfeed.com/buzzfeed-static/static/2018-09/13/11/enhanced/buzzfeed-prod-web-02/enhanced-7512-1536851033-1.jpg?downsize=800:*&output-format=auto&output-quality=auto',
        title: 'Mad Max Fury Road'
    },
    { 
        image: 'https://img.buzzfeed.com/buzzfeed-static/static/2018-12/16/16/enhanced/buzzfeed-prod-web-06/enhanced-8487-1544995699-1.jpg?downsize=800:*&output-format=auto&output-quality=auto',
        title: 'Sleeping Beauty'
    },
    { 
        image: 'https://img.buzzfeed.com/buzzfeed-static/static/2018-09/13/11/enhanced/buzzfeed-prod-web-02/enhanced-7693-1536851296-2.jpg?downsize=800:*&output-format=auto&output-quality=auto',
        title: 'Gravity'
    },
    { 
        image: "https://img.buzzfeed.com/buzzfeed-static/static/2018-07/30/11/enhanced/buzzfeed-prod-web-04/enhanced-16849-1532964908-7.jpg?downsize=800:*&output-format=auto&output-quality=auto",
        title: 'A Bugs Life'
    },
    { 
        image: 'https://img.buzzfeed.com/buzzfeed-static/static/2018-09/13/11/enhanced/buzzfeed-prod-web-04/enhanced-26750-1536851796-1.jpg?downsize=800:*&output-format=auto&output-quality=auto',
        title: '500 Days of Summer'
    },
    { 
        image: 'https://img.buzzfeed.com/buzzfeed-static/static/2018-01/16/11/enhanced/buzzfeed-prod-fastlane-02/enhanced-17561-1516121186-7.jpg?downsize=800:*&output-format=auto&output-quality=auto',
        title: 'Home Alone'
    },
    { 
        image: 'https://img.buzzfeed.com/buzzfeed-static/static/2018-09/13/11/enhanced/buzzfeed-prod-web-06/enhanced-17387-1536854301-14.jpg?downsize=800:*&output-format=auto&output-quality=auto',
        title: 'The Devil Wears Prada'
    },
    { 
        image: 'https://img.buzzfeed.com/buzzfeed-static/static/2018-01/16/20/enhanced/buzzfeed-prod-fastlane-03/enhanced-18655-1516151981-1.jpg?downsize=800:*&output-format=auto&output-quality=auto',
        title: 'Kill Bill Vol 1'
    },
    { 
        image: 'https://img.buzzfeed.com/buzzfeed-static/static/2018-09/13/12/enhanced/buzzfeed-prod-web-06/enhanced-17752-1536854437-1.jpg?downsize=800:*&output-format=auto&output-quality=auto',
        title: 'Brokeback Mountain'
    },
    {
        image: "https://img.buzzfeed.com/buzzfeed-static/static/2018-01/17/5/enhanced/buzzfeed-prod-fastlane-02/enhanced-4554-1516186175-1.jpg?downsize=800:*&output-format=auto&output-quality=auto",
        title: "World War Z"
    }
]