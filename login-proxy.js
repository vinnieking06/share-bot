var jsdom = require("jsdom/lib/old-api.js");
var request = require('request');

const body = {
  'authenticity_token': 'tALE1zbH28gNg5OMOEZB+1q3qjNn0pJmscAwkjwH1P4=',
  'login_form': '04003hQUMXGB0poNf94lis1ztshEYOhBj8SQ7zRJ4SEK/tx+B9YG489wN0OwfSCagD7D7TfUHMAsnWovNLzPeiz1ZT/KhUgGeNqKfeXqFvOptJOPLKV1ry2/+s2GGyjqnyjBFxAuZVYFfECHTKUkZ8zWbl1IO8WxD1KhcAQqSgF7Jw9OV3otSIldf1zxXVkhYr77KTMIYGWCBwYibAjilOCqFplWK3hjVv9ATEVdGJlxBwCc8acbcKqAuWf7gouzBPJaEMCy0s3hRLlX3uHnT/mMq6Sxn6AVxzxp/ED2FVz6zK+GLelibhHVG5YwJVsFx3E/oYDerSQOKdZwPpPV0ZSMv4AI3Pe2n8yqlDhAUvV43nv5zcWIzxP2mxEBc4RlrM6Ux2KxklhqWCjBBhL2ZF0mBMQPcd6kSm4zm2UbrU22b3Pd6Wf1rrmlEKIGit1Q7ozZo2Ji61Ck5rdiHsRUrA6QS1yKGSev+E+KCz2tV/EqaFopQs/EGzmZLxeqL4ckMPgBqFqw8/xKL11fvvRIBvdNE/6a+9aA+eta6HPyNaJmTDbMQAKnp3lHqOPYAwjIEsYAhCiebBE66IIElXD0hEMtvQl2olrNgUNP0uXDPq5/ocBA4fg1oAM2L7UlT624AE8Iika5+mDohXq9f2PXvHogeO3Gk9aWzC1qHz+qoft2WnD6DLgVREB6feN40OQXKM9ISYiRPFI9EQgzqbwpmWa8I730XlOhjRFIr8BUasnqUFuLLTx8TmYiVXSw7PtSQtUR3qs+07R991NQMoIvH4b9NBZkFqaUZegb+KaePAdj0dC1DOkZ9ybRxHxfYV3WeA0UYsMZmVY5fSPgQW7SBWLAtJmtvjuJVQGdTMj6Y82LrlflYU9iUMb03QtuHmc6Pe7cNepEKIoJSuwSQy3zP1/E74hPJxX5Cmud4bkIibh3yGruhzmHVhuxKPPSloZACh8ATzEBdNLiXsNC09gR/Q8fGeshaHYP8Oq6k+cVXJiV2yKAmeNHH6+w6gzvy+gHQIjn7/TabV+IcF4ekCE8uXBivaF3ShitPYbHvbEv/dAhhKFEK+yLQU8FSO7WmRHeKcHYoa3Yb5COsyrKZe/sZnzKt1q44NyGTZasfYs6ZVAotR1h5Nwu1x6PICEgYRS64ItPaPS8h4JzIZckxWd+O6V36i+L0X3cJyebpOfJ8p9LQyx+wfqasflw0VhTny7QKm0Bva3jH3nbRHFsVWEIaCzMHcO8ldW2m1EPRNmBDAZAU2gytgKeNyoUj2KNbKSCekZH0nLWD+7vhS7cE4nZ3meVnnb6dxDiokselRRc6QKdxXt8n6qXgGyhezA5nvMtMzV2lkxmuAlFW7ENEOk8BE5NwubHa83CDZB64xXDPssvtqOtfPuy/g24LvE/nfTx/PZ09TEV+ujlOZ22jG6zpbax2l0vIfbuxeZ/lAvwTTDIQa8qtFFMthSA5fkNNTM75Qsa4yvRhXnDkIuA8awgZTn4XUmO57a/X4nzg7Av9uLZeMFjwaDw1y3KEtf8s16EuwDdsuAzLxWb3e3Kygfgkr6Iw0mFbynw43IM74WJ8ZJi0N1QsZTdwg0/OTjIoc6aSjrgVnaLMbMgCe7/tPibtxGVH63+dkNt9aoNJY5xNr5tN4OZ7sMlzTfnHA==',
  'login_form[password]': 'Co1',
  'login_form[username_email]': 'vinnieking06',
  'utf8': '✓'
}

const test = `authenticity_token:tALE1zbH28gNg5OMOEZB+1q3qjNn0pJmscAwkjwH1P4=
login_form[iobb]:04003hQUMXGB0poNf94lis1ztshEYOhBj8SQ7zRJ4SEK/tx+B9YG489wN0OwfSCagD7D7TfUHMAsnWovNLzPeiz1ZT/KhUgGeNqKfeXqFvOptJOPLKV1ry2/+s2GGyjqnyjBFxAuZVYFfECHTKUkZ8zWbl1IO8WxD1KhcAQqSgF7Jw9OV3otSIldf1zxXVkhYr77KTMIYGWCBwYibAjilOCqFplWK3hjVv9ATEVdGJlxBwCc8acbcKqAuWf7gouzBPJaEMCy0s3hRLlX3uHnT/mMq6Sxn6AVxzxp/ED2FVz6zK+GLelibhHVG5YwJVsFx3E/oYDerSQOKdZwPpPV0ZSMv4AI3Pe2n8yqlDhAUvV43nv5zcWIzxP2mxEBc4RlrM6Ux2KxklhqWCjBBhL2ZF0mBMQPcd6kSm4zm2UbrU22b3Pd6Wf1rrmlEKIGit1Q7ozZo2Ji61Ck5rdiHsRUrA6QS1yKGSev+E+KCz2tV/EqaFopQs/EGzmZLxeqL4ckMPgBqFqw8/xKL11fvvRIBvdNE/6a+9aA+eta6HPyNaJmTDbMQAKnp3lHqOPYAwjIEsYAhCiebBE66IIElXD0hEMtvQl2olrNgUNP0uXDPq5/ocBA4fg1oAM2L7UlT624AE8Iika5+mDohXq9f2PXvHogeO3Gk9aWzC1qHz+qoft2WnD6DLgVREB6feN40OQXKM9ISYiRPFI9EQgzqbwpmWa8I730XlOhjRFIr8BUasnqUFuLLTx8TmYiVXSw7PtSQtUR3qs+07R991NQMoIvH4b9NBZkFqaUZegb+KaePAdj0dC1DOkZ9ybRxHxfYV3WeA0UYsMZmVY5fSPgQW7SBWLAtJmtvjuJVQGdTMj6Y82LrlflYU9iUMb03QtuHmc6Pe7cNepEKIoJSuwSQy3zP1/E74hPJxX5Cmud4bkIibh3yGruhzmHVhuxKPPSloZACh8ATzEBdNLiXsNC09gR/Q8fGeshaHYP8Oq6k+cVXJiV2yKAmeNHH6+w6gzvy+gHQIjn7/TabV+IcF4ekCE8uXBivaF3ShitPYbHvbEv/dAhhKFEK+yLQU8FSO7WmRHeKcHYoa3Yb5COsyrKZe/sZnzKt1q44NyGTZasfYs6ZVAotR1h5Nwu1x6PICEgYRS64ItPaPS8h4JzIZckxWd+O6V36i+L0X3cJyebpOfJ8p9LQyx+wfqasflw0VhTny7QKm0Bva3jH3nbRHFsVWEIaCzMHcO8ldW2m1EPRNmBDAZAU2gytgKeNyoUj2KNbKSCekZH0nLWD+7vhS7cE4nZ3meVnnb6dxDiokselRRc6QKdxXt8n6qXgGyhezA5nvMtMzV2lkxmuAlFW7ENEOk8BE5NwubHa83CDZB64xXDPssvtqOtfPuy/g24LvE/nfTx/PZ09TEV+ujlOZ22jG6zpbax2l0vIfbuxeZ/lAvwTTDIQa8qtFFMthSA5fkNNTM75Qsa4yvRhXnDkIuA8awgZTn4XUmO57a/X4nzg7Av9uLZeMFjwaDw1y3KEtf8s16EuwDdsuAzLxWb3e3Kygfgkr6Iw0mFbynw43IM74WJ8ZJi0N1QsZTdwg0/OTjIoc6aSjrgVnaLMbMgCe7/tPibtxGVH63+dkNt9aoNJY5xNr5tN4OZ7sMlzTfnHA==
login_form[password]:Coolguy1
login_form[username_email]:vinnieking06
utf8:✓`

var options = { method: 'POST',
  url: 'https://poshmark.com/login',
  headers: 
   { 'postman-token': '75764dd7-9e15-1877-8e8f-7462d4af0043',
     'cache-control': 'no-cache',
     cookie: '__ssid=10793118-a475-4156-a68c-67ad622143a3; fbm_182809591793403=base_domain=.poshmark.com; ps=%7B%22bid%22%3A%2259894ea5b88c56bbc77bddc4%22%7D; __ssid=27b0efe7-cfaa-4dd7-bfe8-c3c7018bdcb6; fbm_182809591793403=base_domain=.poshmark.com; hbb=true; tgprm=true; tgfd=true; tgsh=true; _gat=1; _gat_tracker1=1; _ga=GA1.2.89915324.1502170791; _gid=GA1.2.2058853843.1502520278; rt=%7B%22src%22%3A%5B%7B%22rf%22%3Anull%2C%22lpu%22%3A%22%2F%22%2C%22lpt%22%3A%22Home%22%2C%22rs%22%3Anull%7D%2C%7B%22rf%22%3Anull%2C%22lpu%22%3A%22%2F%22%2C%22lpt%22%3A%22Home%22%2C%22rs%22%3Anull%7D%2C%7B%22rf%22%3Anull%2C%22lpu%22%3A%22%2Ffeed%22%2C%22lpt%22%3A%22Feed%22%2C%22rs%22%3Anull%7D%2C%7B%22rf%22%3Anull%2C%22lpu%22%3A%22%2F%22%2C%22lpt%22%3A%22Home%22%2C%22rs%22%3Anull%7D%2C%7B%22rf%22%3Anull%2C%22lpu%22%3A%22%2Ffeed%22%2C%22lpt%22%3A%22Feed%22%2C%22rs%22%3Anull%7D%5D%7D; tgnb=true; tgprm=true; tgfd=true; tgsh=true; sp=%7B%22type%22%3A%22listings%22%2C%22dept%22%3A%22Men%22%7D; wba=2017-08-18T18%3A30%3A18-07%3A00; _web_session=BAh7B0kiD3Nlc3Npb25faWQGOgZFRkkiJWE5OWQ5MTIwZmUxN2EwM2ZjMzBiZDE5NWNiZDE0OWUzBjsAVEkiEF9jc3JmX3Rva2VuBjsARkkiMXRBTEUxemJIMjhnTmc1T01PRVpCKzFxM3FqTm4wcEptc2NBd2tqd0gxUDQ9BjsARg%3D%3D--926a1b51fd8bee740d0a79d78c4add9e776b8d23; _ga=GA1.2.89915324.1502170791; _gid=GA1.2.2058853843.1502520278',
     'accept-language': 'en-US,en;q=0.8',
     'accept-encoding': 'gzip, deflate, br',
     referer: 'https://poshmark.com/login',
     accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
     'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
     'content-type': 'application/x-www-form-urlencoded',
     'upgrade-insecure-requests': '1',
     origin: 'http://evil.com/' },
  form: test };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(response.headers["set-cookie"]);
});


// jsdom.env( {
//     url:"https://poshmark.com/feed",
//     headers: headers.scrapeHeader,
//     scripts:["http://code.jquery.com/jquery.js"],
//     done: function (err, window) {
//       const ids = window.document.getElementsByClassName('tile');
//       const final = [];
//       for (let i = 0; i < ids.length; i++) {
//         final.push(ids[i].id);
//       }
//       delayShare(final);
//     }
//   })