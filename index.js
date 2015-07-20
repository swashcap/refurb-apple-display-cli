#! /user/bin/env node

var request = require('request');
var cheerio = require('cheerio');
var chalk = require('chalk');

request(
    'http://www.apple.com/shop/browse/home/specialdeals/mac',
    function (err, res, body) {
        if (err) {
            console.error(err.toString());
            return;
        } else if (res.statusCode !== 200) {
            console.error(res.statusCode);
            return;
        }
        
        var $ = cheerio.load(body);
        var displaysLink =
            $('#navigation ul')
                .eq(0)
                .find('li')
                .filter(function (index, el) {
                    return $(this).text().indexOf('Displays') !== -1;
                })
                .find('a');
        
        if (displaysLink.length > 0) {
            console.log(chalk.green('Apple refurb displays available!'));
        } else {
            console.log(chalk.red('No Apple refurb displays for sale.'));
        }
    }
);

