var jsdom = require("jsdom/lib/old-api.js");
var request = require('request');

const body = {
  'authenticity_token': 'tALE1zbH28gNg5OMOEZB+1q3qjNn0pJmscAwkjwH1P4=',
  'login_form': '04003hQUMXGB0poNf94lis1ztshEYOhBj8SQ7zRJ4SEK/tx+B9YG489wN0OwfSCagD7D7TfUHMAsnWovNLzPeiz1ZT/KhUgGeNqKfeXqFvOptJOPLKV1ry2/+s2GGyjqnyjBFxAuZVYFfECHTKUkZ8zWbl1IO8WxD1KhcAQqSgF7Jw9OV3otSIldf1zxXVkhYr77KTMIYGWCBwYibAjilOCqFplWK3hjVv9ATEVdGJlxBwCc8acbcKqAuWf7gouzBPJaEMCy0s3hRLlX3uHnT/mMq6Sxn6AVxzxp/ED2FVz6zK+GLelibhHVG5YwJVsFx3E/oYDerSQOKdZwPpPV0ZSMv4AI3Pe2n8yqlDhAUvV43nv5zcWIzxP2mxEBc4RlrM6Ux2KxklhqWCjBBhL2ZF0mBMQPcd6kSm4zm2UbrU22b3Pd6Wf1rrmlEKIGit1Q7ozZo2Ji61Ck5rdiHsRUrA6QS1yKGSev+E+KCz2tV/EqaFopQs/EGzmZLxeqL4ckMPgBqFqw8/xKL11fvvRIBvdNE/6a+9aA+eta6HPyNaJmTDbMQAKnp3lHqOPYAwjIEsYAhCiebBE66IIElXD0hEMtvQl2olrNgUNP0uXDPq5/ocBA4fg1oAM2L7UlT624AE8Iika5+mDohXq9f2PXvHogeO3Gk9aWzC1qHz+qoft2WnD6DLgVREB6feN40OQXKM9ISYiRPFI9EQgzqbwpmWa8I730XlOhjRFIr8BUasnqUFuLLTx8TmYiVXSw7PtSQtUR3qs+07R991NQMoIvH4b9NBZkFqaUZegb+KaePAdj0dC1DOkZ9ybRxHxfYV3WeA0UYsMZmVY5fSPgQW7SBWLAtJmtvjuJVQGdTMj6Y82LrlflYU9iUMb03QtuHmc6Pe7cNepEKIoJSuwSQy3zP1/E74hPJxX5Cmud4bkIibh3yGruhzmHVhuxKPPSloZACh8ATzEBdNLiXsNC09gR/Q8fGeshaHYP8Oq6k+cVXJiV2yKAmeNHH6+w6gzvy+gHQIjn7/TabV+IcF4ekCE8uXBivaF3ShitPYbHvbEv/dAhhKFEK+yLQU8FSO7WmRHeKcHYoa3Yb5COsyrKZe/sZnzKt1q44NyGTZasfYs6ZVAotR1h5Nwu1x6PICEgYRS64ItPaPS8h4JzIZckxWd+O6V36i+L0X3cJyebpOfJ8p9LQyx+wfqasflw0VhTny7QKm0Bva3jH3nbRHFsVWEIaCzMHcO8ldW2m1EPRNmBDAZAU2gytgKeNyoUj2KNbKSCekZH0nLWD+7vhS7cE4nZ3meVnnb6dxDiokselRRc6QKdxXt8n6qXgGyhezA5nvMtMzV2lkxmuAlFW7ENEOk8BE5NwubHa83CDZB64xXDPssvtqOtfPuy/g24LvE/nfTx/PZ09TEV+ujlOZ22jG6zpbax2l0vIfbuxeZ/lAvwTTDIQa8qtFFMthSA5fkNNTM75Qsa4yvRhXnDkIuA8awgZTn4XUmO57a/X4nzg7Av9uLZeMFjwaDw1y3KEtf8s16EuwDdsuAzLxWb3e3Kygfgkr6Iw0mFbynw43IM74WJ8ZJi0N1QsZTdwg0/OTjIoc6aSjrgVnaLMbMgCe7/tPibtxGVH63+dkNt9aoNJY5xNr5tN4OZ7sMlzTfnHA==',
  'login_form[password]': 'Co1',
  'login_form[username_email]': 'vinnieking06',
  'utf8': '✓'
}

const test = `authenticity_token:tlAQIgzD1xOVKjM1IbC8F0Z6TjY2u/aXRSbupGR44oI=
login_form[iobb]:04003hQUMXGB0poNf94lis1ztshEYOhBj8SQ7zRJ4SEK/tx+B9YG489wN0OwfSCagD7D7TfUHMAsnWovNLzPeiz1ZT/KhUgGeNqKfeXqFvOptJOPLKV1ry2/+s2GGyjqnyjBEIinTC1FuaiHTKUkZ8zWbl1IO8WxD1KhcAQqSgF7Jw9OV3otSIldf1zxXVkhYr77KTMIYGWCBwYibAjilOCqFplWK3hjVv9ATEVdGJlxBwCc8acbcKqAuWf7gouzBPJaEMCy0s3hRLlX3uHnT/mMq6Sxn6AVxzxp/ED2FVz6zK+GLelibhHVG5YwJVsFx3E/oYDerSQOKdZwPpPV0ZSMv70wiBOoiF4SBHeu8kHGR7hcs8CIpvZqANF4c1T8huUjmH+k3h9jI1FPMVV3tbZI6sQPcd6kSm4zm2UbrU22b3Pd6Wf1rrmlEKIGit1Q7ozZo2Ji61Ck5rdiHsRUrA6QS1yKGSev+E+KCz2tV/EqaFopQs/EGzmZLxeqL4ckMPgBONCPjSnhie7YjKNv1Tm0Vf6a+9aA+eta6HPyNaJmTDYddKmXFySZQ0Rkbkevtc33hCiebBE66IIElXD0hEMtvQl2olrNgUNP0uXDPq5/ocBA4fg1oAM2L7UlT624AE8Iika5+mDohXq9f2PXvHogeO3Gk9aWzC1qHz+qoft2WnD6DLgVREB6feN40OQXKM9ISYiRPFI9EQgzqbwpmWa8I730XlOhjRFIr8BUasnqUFuLLTx8TmYiVXSw7PtSQtUR3qs+07R991NQMoIvH4b9NBZkFqaUZegb+KaePAdj0dC1DOkZ9ybRxHxfYV3WeA0UYsMZmVY5fSPgQW7SBWLAtJmtvjuJVQGdTMj6Y82LrlflYU9iUMb03QtuHmc6Pe7cNepEKIoJSuwSQy3zP1/E74hPJxX5Cmud4bkIibh3yGruhzmHVhuxKPPSloZACh8ATzEBdNLiXsNC09gR/Q8fGeshaHYP8Oq6k+cVXJiV2yKAmeNHH6+w6mADpqDQu12m2qeLLbKKsb4tLAWrAou65q1tNf1RmZtqdc+qb98QwkpH+nFKAaF4qCtCqybblvY+0yhTiEYSiciVo6uMDJ6JlFq44NyGTZasfYs6ZVAotR1h5Nwu1x6PICEgYRS64ItPaPS8h4JzIZckxWd+O6V36i+L0X3cJyebpOfJ8p9LQyx+wfqasflw0VhTny7QKm0Bva3jH3nbRHFsVWEIaCzMHcO8ldW2m1EPRNmBDAZAU2gytgKeNyoUj2KNbKSCekZH0nLWD+7vhS7cE4nZ3meVnnb6dxDiokselRRc6QKdxXt8n6qXgGyhezA5nvMtMzV2lkxmuAlFW7ENEOk8BE5NwubHa83CDZB64xXDPssvtqOtfPuy/g24LvE/nfTx/PZ09TEV+ujlOZ22jG6zpbax2l0vIfbuxeZ/lAvwTTDIQa8qtFFMthSA5fkNNTM75Qsa4yvRhXnDkIuA8awgZTn4XUmO57a/X4nzg7Av9uLZeMFjwaDw1y3KEtf8s16EuwDdsuAzLxWb3e3Kygfgkr6Iw0mFbynw43IM74WJ8ZJi0N1QsZTdwg0/OTjIoc6aSjrgVnaLMbMgCe7/tPibtxGVH63+dkNt9aoNJY5xNr5tN4OZ7sMlzTfnHA==
login_form[password]:Coolguy1
login_form[username_email]:vinnieking06
utf8:✓`

var options = { method: 'POST',
  url: 'https://poshmark.com/login',
  headers: 
   { 'postman-token': 'e6a4f128-464b-cf6b-3633-48cbdae8d176',
     'cache-control': 'no-cache',
     'accept-language': 'en-US,en;q=0.8',
     'accept-encoding': 'gzip, deflate, br',
     referer: 'https://poshmark.com/login',
     accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
     'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
     'content-type': 'application/x-www-form-urlencoded',
     'upgrade-insecure-requests': '1',
     origin: 'https://poshmark.com' },
  form: test };

jsdom.env( {
    url:"https://poshmark.com/feed",
    method: 'POST',
    headers:   { 'postman-token': 'e6a4f128-464b-cf6b-3633-48cbdae8d176',
     'cache-control': 'no-cache',
     'accept-language': 'en-US,en;q=0.8',
     'accept-encoding': 'gzip, deflate, br',
     referer: 'https://poshmark.com/login',
     accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
     'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
     'content-type': 'application/x-www-form-urlencoded',
     'upgrade-insecure-requests': '1',
     origin: 'https://poshmark.com' },
     form: test,
    scripts:["http://code.jquery.com/jquery.js"],
    done: function (err, window) {
      const ids = window.document.getElementsByClassName('tile');
      const final = [];
      for (let i = 0; i < ids.length; i++) {
        console.log(ids[i].id);
      }
    }
  })