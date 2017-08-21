var jsdom = require("jsdom/lib/old-api.js");
var request = require('request');

const body = {
  'authenticity_token': 'tALE1zbH28gNg5OMOEZB+1q3qjNn0pJmscAwkjwH1P4=',
  'login_form': '04003hQUMXGB0poNf94lis1ztshEYOhBj8SQ7zRJ4SEK/tx+B9YG489wN0OwfSCagD7D7TfUHMAsnWovNLzPeiz1ZT/KhUgGeNqKfeXqFvOptJOPLKV1ry2/+s2GGyjqnyjBFxAuZVYFfECHTKUkZ8zWbl1IO8WxD1KhcAQqSgF7Jw9OV3otSIldf1zxXVkhYr77KTMIYGWCBwYibAjilOCqFplWK3hjVv9ATEVdGJlxBwCc8acbcKqAuWf7gouzBPJaEMCy0s3hRLlX3uHnT/mMq6Sxn6AVxzxp/ED2FVz6zK+GLelibhHVG5YwJVsFx3E/oYDerSQOKdZwPpPV0ZSMv4AI3Pe2n8yqlDhAUvV43nv5zcWIzxP2mxEBc4RlrM6Ux2KxklhqWCjBBhL2ZF0mBMQPcd6kSm4zm2UbrU22b3Pd6Wf1rrmlEKIGit1Q7ozZo2Ji61Ck5rdiHsRUrA6QS1yKGSev+E+KCz2tV/EqaFopQs/EGzmZLxeqL4ckMPgBqFqw8/xKL11fvvRIBvdNE/6a+9aA+eta6HPyNaJmTDbMQAKnp3lHqOPYAwjIEsYAhCiebBE66IIElXD0hEMtvQl2olrNgUNP0uXDPq5/ocBA4fg1oAM2L7UlT624AE8Iika5+mDohXq9f2PXvHogeO3Gk9aWzC1qHz+qoft2WnD6DLgVREB6feN40OQXKM9ISYiRPFI9EQgzqbwpmWa8I730XlOhjRFIr8BUasnqUFuLLTx8TmYiVXSw7PtSQtUR3qs+07R991NQMoIvH4b9NBZkFqaUZegb+KaePAdj0dC1DOkZ9ybRxHxfYV3WeA0UYsMZmVY5fSPgQW7SBWLAtJmtvjuJVQGdTMj6Y82LrlflYU9iUMb03QtuHmc6Pe7cNepEKIoJSuwSQy3zP1/E74hPJxX5Cmud4bkIibh3yGruhzmHVhuxKPPSloZACh8ATzEBdNLiXsNC09gR/Q8fGeshaHYP8Oq6k+cVXJiV2yKAmeNHH6+w6gzvy+gHQIjn7/TabV+IcF4ekCE8uXBivaF3ShitPYbHvbEv/dAhhKFEK+yLQU8FSO7WmRHeKcHYoa3Yb5COsyrKZe/sZnzKt1q44NyGTZasfYs6ZVAotR1h5Nwu1x6PICEgYRS64ItPaPS8h4JzIZckxWd+O6V36i+L0X3cJyebpOfJ8p9LQyx+wfqasflw0VhTny7QKm0Bva3jH3nbRHFsVWEIaCzMHcO8ldW2m1EPRNmBDAZAU2gytgKeNyoUj2KNbKSCekZH0nLWD+7vhS7cE4nZ3meVnnb6dxDiokselRRc6QKdxXt8n6qXgGyhezA5nvMtMzV2lkxmuAlFW7ENEOk8BE5NwubHa83CDZB64xXDPssvtqOtfPuy/g24LvE/nfTx/PZ09TEV+ujlOZ22jG6zpbax2l0vIfbuxeZ/lAvwTTDIQa8qtFFMthSA5fkNNTM75Qsa4yvRhXnDkIuA8awgZTn4XUmO57a/X4nzg7Av9uLZeMFjwaDw1y3KEtf8s16EuwDdsuAzLxWb3e3Kygfgkr6Iw0mFbynw43IM74WJ8ZJi0N1QsZTdwg0/OTjIoc6aSjrgVnaLMbMgCe7/tPibtxGVH63+dkNt9aoNJY5xNr5tN4OZ7sMlzTfnHA==',
  'login_form[password]': 'test',
  'login_form[username_email]': 'vinnieking06',
  'utf8': '✓'
}

const test = `authenticity_token:tlAQIgzD1xOVKjM1IbC8F0Z6TjY2u/aXRSbupGR44oI=
login_form[iobb]:04003hQUMXGB0poNf94lis1ztshEYOhBj8SQ7zRJ4SEK/tx+B9YG489wN0OwfSCagD7D7TfUHMAsnWovNLzPeiz1ZT/KhUgGeNqKfeXqFvOptJOPLKV1ry2/+s2GGyjqnyjBEIinTC1FuaiHTKUkZ8zWbl1IO8WxD1KhcAQqSgF7Jw9OV3otSIldf1zxXVkhYr77KTMIYGWCBwYibAjilOCqFplWK3hjVv9ATEVdGJlxBwCc8acbcKqAuWf7gouzBPJaEMCy0s3hRLlX3uHnT/mMq6Sxn6AVxzxp/ED2FVz6zK+GLelibhHVG5YwJVsFx3E/oYDerSQOKdZwPpPV0ZSMv70wiBOoiF4SBHeu8kHGR7hcs8CIpvZqANF4c1T8huUjmH+k3h9jI1FPMVV3tbZI6sQPcd6kSm4zm2UbrU22b3Pd6Wf1rrmlEKIGit1Q7ozZo2Ji61Ck5rdiHsRUrA6QS1yKGSev+E+KCz2tV/EqaFopQs/EGzmZLxeqL4ckMPgBONCPjSnhie7YjKNv1Tm0Vf6a+9aA+eta6HPyNaJmTDYddKmXFySZQ0Rkbkevtc33hCiebBE66IIElXD0hEMtvQl2olrNgUNP0uXDPq5/ocBA4fg1oAM2L7UlT624AE8Iika5+mDohXq9f2PXvHogeO3Gk9aWzC1qHz+qoft2WnD6DLgVREB6feN40OQXKM9ISYiRPFI9EQgzqbwpmWa8I730XlOhjRFIr8BUasnqUFuLLTx8TmYiVXSw7PtSQtUR3qs+07R991NQMoIvH4b9NBZkFqaUZegb+KaePAdj0dC1DOkZ9ybRxHxfYV3WeA0UYsMZmVY5fSPgQW7SBWLAtJmtvjuJVQGdTMj6Y82LrlflYU9iUMb03QtuHmc6Pe7cNepEKIoJSuwSQy3zP1/E74hPJxX5Cmud4bkIibh3yGruhzmHVhuxKPPSloZACh8ATzEBdNLiXsNC09gR/Q8fGeshaHYP8Oq6k+cVXJiV2yKAmeNHH6+w6mADpqDQu12m2qeLLbKKsb4tLAWrAou65q1tNf1RmZtqdc+qb98QwkpH+nFKAaF4qCtCqybblvY+0yhTiEYSiciVo6uMDJ6JlFq44NyGTZasfYs6ZVAotR1h5Nwu1x6PICEgYRS64ItPaPS8h4JzIZckxWd+O6V36i+L0X3cJyebpOfJ8p9LQyx+wfqasflw0VhTny7QKm0Bva3jH3nbRHFsVWEIaCzMHcO8ldW2m1EPRNmBDAZAU2gytgKeNyoUj2KNbKSCekZH0nLWD+7vhS7cE4nZ3meVnnb6dxDiokselRRc6QKdxXt8n6qXgGyhezA5nvMtMzV2lkxmuAlFW7ENEOk8BE5NwubHa83CDZB64xXDPssvtqOtfPuy/g24LvE/nfTx/PZ09TEV+ujlOZ22jG6zpbax2l0vIfbuxeZ/lAvwTTDIQa8qtFFMthSA5fkNNTM75Qsa4yvRhXnDkIuA8awgZTn4XUmO57a/X4nzg7Av9uLZeMFjwaDw1y3KEtf8s16EuwDdsuAzLxWb3e3Kygfgkr6Iw0mFbynw43IM74WJ8ZJi0N1QsZTdwg0/OTjIoc6aSjrgVnaLMbMgCe7/tPibtxGVH63+dkNt9aoNJY5xNr5tN4OZ7sMlzTfnHA==
login_form[password]:test
login_form[username_email]:vinnieking06
utf8:✓`

var goodOptions = { method: 'POST',
  url: 'https://poshmark.com/login',
  headers: 
   { 'postman-token': '865d0421-d6d9-b3a0-315b-9de01b439511',
     'cache-control': 'no-cache',
     cookie: '__ssid=10793118-a475-4156-a68c-67ad622143a3; fbm_182809591793403=base_domain=.poshmark.com; ps=%7B%22bid%22%3A%2259894ea5b88c56bbc77bddc4%22%7D; __ssid=27b0efe7-cfaa-4dd7-bfe8-c3c7018bdcb6; fbm_182809591793403=base_domain=.poshmark.com; hbb=true; _gat=1; _gat_tracker1=1; tgnb=true; tgprm=true; tgfd=true; tgsh=true; _ga=GA1.2.89915324.1502170791; _gid=GA1.2.2058853843.1502520278; sp=%7B%22type%22%3A%22listings%22%2C%22dept%22%3A%22Women%22%7D; rt=%7B%22src%22%3A%5B%7B%22rf%22%3Anull%2C%22lpu%22%3A%22%2Fuser%2F56ab09b2664f6a2cdf0b2752%2Ffollow_user%22%2C%22lpt%22%3A%22Other%22%2C%22rs%22%3Anull%7D%2C%7B%22rf%22%3Anull%2C%22lpu%22%3A%22%2F%22%2C%22lpt%22%3A%22Home%22%2C%22rs%22%3Anull%7D%2C%7B%22rf%22%3Anull%2C%22lpu%22%3A%22%2Ffeed%22%2C%22lpt%22%3A%22Feed%22%2C%22rs%22%3Anull%7D%2C%7B%22rf%22%3Anull%2C%22lpu%22%3A%22%2F%22%2C%22lpt%22%3A%22Home%22%2C%22rs%22%3Anull%7D%2C%7B%22rf%22%3Anull%2C%22lpu%22%3A%22%2Ffeed%22%2C%22lpt%22%3A%22Feed%22%2C%22rs%22%3Anull%7D%5D%7D; wba=2017-08-19T01%3A22%3A15-07%3A00; _web_session=BAh7B0kiD3Nlc3Npb25faWQGOgZFRkkiJWY4NTA0OTMwYzcyZGM0M2ViZmNlZjQ2MTFiYjU3MTNiBjsAVEkiEF9jc3JmX3Rva2VuBjsARkkiMTh6QmJyNkVYTDZQNzlvUnk3T05XdnVZUkZVbGZOZTRDMUNYbFpmeGRocnc9BjsARg%3D%3D--a9637e76ecee9be055cbb710eb035e9a0e2b1703; _ga=GA1.2.89915324.1502170791; _gid=GA1.2.2058853843.1502520278',
     'accept-language': 'en-US,en;q=0.8',
     'accept-encoding': 'gzip, deflate, br',
     referer: 'https://poshmark.com/login',
     accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
     'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
     'content-type': 'application/x-www-form-urlencoded',
     'upgrade-insecure-requests': '1',
     origin: 'https://poshmark.com' },
  form: {
      auth : {
        'authenticity_token': 'bFXDV86b8aQRI3u9BtRcQArphReDpUBoeEY7ni8+hfM=',
        'login_form': '04003hQUMXGB0poNf94lis1ztshEYOhBj8SQ7zRJ4SEK/tx+B9YG489wN0OwfSCagD7D7TfUHMAsnWovNLzPeiz1ZT/KhUgGeNqKfeXqFvOptJOPLKV1ry2/+s2GGyjqnyjBFxAuZVYFfECHTKUkZ8zWbl1IO8WxD1Kht8TqEibpebBOV3otSIldf1zxXVkhYr77KTMIYGWCBwYibAjilOCqFplWK3hjVv9ATEVdGJlxBwCc8acbcKqAuWf7gouzBPJaEMCy0s3hRLlX3uHnT/mMq6Sxn6AVxzxp/ED2FVz6zK96DgNxszbLkaDl1FsZY8jwYa/hFBBVErqVT31SgfbGSa5FQH4lCu3Ai9eWTBfCd0q5R9tv7uKnExf/HcS7zMVkgXbWtJxVIaTCdwIsNEu7G1+rdsbATajAyMeRup82fY15RZwU9zPDpIem+V7o3Xg/w+E1ob+/FRCJ3uese38lURah37+pYGavPMP6nPaQnU0wZ8YN8wmMvS11HIeGs2Ygd7lwbWNuHGGJ8Ft8/0Vks7mZnC9N+MV70X36ReTqNZHXY0NS2w7/MxsqQkbwnTQVDX8icOWPZcy4Xo6JR+o8uNh2BeaMmRyX5a46USHofvkoB8oZZ0btVKuAYPLgrJZJYUcRNcJsz+1j3aE1Kav6TbwSyw9pfmqz7/mKE+9Q0kX/FfHPmIcnYR1RYRiJOl9ol497OvQs3KuWuA1B7VjcSxzau3Mn8nrB7E1Pf46IvXtYdEyMOakFzprLKk3u1s0IOuzw5mXZ8AIIU3TyItbi6rAcesNbcdJjGc+x7ZkkKyrh7d/W78RPOnlWmCRBdNDNnZsKRSTH+IMu2Yne5oa3M4xhQ0mjam1xyyeSERjOkCVUgBbu4NCNc8nkpk5j7w7ZnmVsrBuRjVYuIsQnjM1OeTWAbv50krowuNlnNGsH1waQzn07NjBjGFPeImNr/UVPV6i8/tb5alAK/XRNo3H5dCCofHI9aHmKGVsh1GZGb/t+MWh63oYq0grR0F8QZUZoBIppH0zgk2dFV2dEdhLyN7rNdalUMpskVmY5Yao3ygyWGcjCJ2deMWSe7C3iu3P93aLLbE4gjqllzON6JlWf/+dVvu4eBdAZqgjITrQVcyqmjIkq5qftS7QndrGGVnAk80aKvKixGUf6oxNEfoZFV+S24ttMGG6sXUx2ddU5OPCCOX680qzq/uUq87u17lXRMFdx4wimxQE05lyt1veYpHNuv7sghWOEeioIZRnmC0W+ochQziz7ftZJCaKwymxS1wfmZzpno82u3Z2HQd3V4wfJ/zck+QECqJOz7YCWoR9VJUiLP0GDKsz9z5rLaEtDVgssFn/ihIjIBLuNQBEEs6ZNlJnKnwkOcD6T1dGUjL+mD6wNO/XXFOf8EAhm/5w5AbgXVzxg9BeSyEU1G3y4TBJfbM4oDtumDzb6nc3hkd/NYKRSb/cZmDgbtTyFQnIKRUJy4DNiOYFlMYiiM+4N7AWLcDXxty2zl/I4lQJs93RpcqX+HkKHyuvrxyXVBTu9SYoxfVNihV97oZ1+3UXTApVPfVKB9sZJJbm9dIY4yyMqhPDnRRodTbth1/BtUNGFjZW1ffiiCMRH1uEtv8t+Fj0t2be7zUNBc0CA+UvacqlVQXB7goC+Ng==',
        'login_form[password]': 'test',
        'login_form[username_email]': 'vinnieking06',
          'utf8': '✓'
      }

  } };

  request(goodOptions, function (error, response, body) {
    if (error) throw new Error(error);
    console.log('cookie', response.headers['set-cookie']);
    console.log(body);
    console.log(response);
});

// jsdom.env( {
//     url:"https://poshmark.com/feed",
//     method: 'POST',
//     headers:   { 'postman-token': 'e6a4f128-464b-cf6b-3633-48cbdae8d176',
//      'cache-control': 'no-cache',
//      'accept-language': 'en-US,en;q=0.8',
//      'accept-encoding': 'gzip, deflate, br',
//      referer: 'https://poshmark.com/login',
//      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
//      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
//      'content-type': 'application/x-www-form-urlencoded',
//      'upgrade-insecure-requests': '1',
//      origin: 'https://poshmark.com' },
//      form: test,
//     scripts:["http://code.jquery.com/jquery.js"],
//     done: function (err, window) {
//       const ids = window.document.getElementsByClassName('tile');
//       const final = [];
//       for (let i = 0; i < ids.length; i++) {
//         console.log(ids[i].id);
//       }
//     }
//   })