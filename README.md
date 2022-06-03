# Bookers

//OTWÓRZ APLIKACJĘ NA VPS'IE(!!!PRZECZYTAJ README DO KOŃCA, JESLI CHCESZ KORZYSTAC Z APLIKACJI Z POZIOMU PRZEGLADARKI!!!)
 https://dashboard.heroku.com/apps/bookeers
//INSTALACJA APLIKACJI NA LOCALHOSCIE                                                                     
-POSIADAC WERSJE NODE.JS 16.0+
(jeśli nie posiadasz NODE'a, mozesz go pobrać tutaj: https://nodejs.org/en/ )
- NALEZY POBRAC LINK Z REPOZYTORIUM
 https://github.com/Bazzamek/Bookers.git

- OTWORZYC TERMINAl (Ctrl+Shift+~)                                                                   

-WPISAC W TERMINALU 
   npm install

-PO ZAINSTALOWANIU MODUŁÓW(NPM) NALEZY WPROWADZIĆ KOMENDE W TERMINALU

   nodemon ./bin/www

LUB

   node ./bin/www

-PO WYKONANIU TYCH CZYNNOSCI APLIKACJA JEST DOSTĘPNA POD ADRESEM
   localhost:3000

//JAK KORZYSTAĆ Z APLIKACJI?

-ABY ZAMÓWIĆ USLUGĘ:
 -zarejestruj się

 lub w wersji demonstracyjnej:

 -zaloguj się uzywając:

   email: user@user.com
   password: user

-ADMIN DASHBOARD (!!!NIE DZIALA NA HOSTINGU!!!)
  
   -z poziomu admina mozesz:
     
     edytować, dodać, usunąć, a także odczytać usługi wykonawcow dostepnych na Booker.com

     odczytać, usunać aktualne zlecenia

    -Aby zalogować się do Panelu Admina:

    email: admin@admin.com
    password: admin

-HYDRAULIK DASHBOARD

   -z poziomu admina mozesz:
     
     edytować, dodać, usunąć, a także odczytać usługi ktore swiadczy HYDRAULIK

     odczytać, usunać aktualne zlecenia ktore zlecono HYDRAULIKOWI

    -Aby zalogować się do Panelu HYDRAULIKA:

    email: hydraulik@gmail.com
    password: hydraulik

-ELEKTRYK DASHBOARD

   -z poziomu admina mozesz:
     
     edytować, dodać, usunąć, a także odczytać usługi ktore swiadczy ELEKTRYK

     odczytać, usunać aktualne zlecenia ktore zlecono ELEKTRYKOWI

    -Aby zalogować się do Panelu ELEKTRYKA:

    email: elektryk1234@gmail.com
    password: elektryk

-OGRODNIK DASHBOARD

   -z poziomu admina mozesz:
     
     edytować, dodać, usunąć, a także odczytać usługi ktore swiadczy OGRODNIK

     odczytać, usunać aktualne zlecenia ktore zlecono OGRODNIK

    -Aby zalogować się do Panelu OGRODNIK:

    email: ogrodnik1234@gmail.com
    password: ogrodnik


//JAK NAWIGOWAĆ SIE NA STRONIE BOOKER.COM?
  
  Aplikacja Booker po logowaniu rozpoznaje, jaka role posiada uzytkownik. 
 
 --UZYTKOWNIK(KLIENT)
  Jesli logujesz się z poziomu uzytkownika, zostaniesz przekierowany do panelu wyboru wykonawcy,
  gdzie bedziesz mogl sfinalizować zlecenie.

--ADMIN
  Po zalogowaniu zostaniesz przekierowany do Panelu Admina(w wersji na hostingu, usluga niedostepna.),
  gdzie bedziesz mógł wykonać dowolne zadanie na które pozwala system

--WYKONAWCA
  Po zalogowaniu zostaniesz przekierowany do Panelu Wykonawcy(tego, ktorego danymi się logowales)
  gdzie bedziesz mogl wykonać dowolne zadanie na ktore pozwala system.







  



