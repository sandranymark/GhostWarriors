## VÄLKOMNA TILL GHOSTWARRIORS MINI DOKUMENTATION!

![image](https://github.com/user-attachments/assets/b6039f08-3fd8-4f43-a607-ff9cf67727f3)

### 
<h3>klicka på länken nedan för att besöka sidan:</h3>

http://dforbreakfast.s3-website.eu-north-1.amazonaws.com/

##

<h4>Kort om Login sidan:</h4>

![image](https://github.com/user-attachments/assets/e70bc4df-09ec-45a9-97cd-a075b5c50abf)

- man kan logga in en användare genom att klicka på login knappen.
- för att logga in som admin skriv in: anton som användarnamn och Test@1234 som lösenord. (NOTERA TEST MED STOR T!)
- för att logga in som vanlig "user" skriv in: adrean som användarnamn och adrean@1234 (inga rättigheter)
- du kan även skapa en egen användare genom att klicka på knappen "create account" men observera att du endast är inloggad som en enkel användare, alltså inga ADMIN rättigheter.

##

<h4>Inloggad som admin</h4>

  http://dforbreakfast.s3-website.eu-north-1.amazonaws.com/staff
  
- När du har loggat in som admin kommer du direkt till ordersidan där du kan ändra status på en ordern till preparing som gör att ordern blir låst, genom att klicka på knappen edit kan du redigera en order (tex quantity, och meddelande).
- Du kan bocka i done så ändras status på ordern till done och ordern är klar för att hämtas, du kan även rensa alla färdiga ordrar genom att klicka på "clear all orders".

- Som admin har du även rätt att ändra produkterna som ligger under meny-sidan.
- klicka på rubriken, beskrivningen eller priset för att redigera (bild ej redigeringsbar).
  ![image](https://github.com/user-attachments/assets/1172e34a-315d-4b67-a315-fb09e4bd47f9)

- För att lägga till en ny produkt klicka på den gröna "+" knappen och lägg till en ny produkt.
- Under kategorie måste ni använda "Dish, Beverage, eller SwedishFika" (för att kunna sortera rätt).
- Du måste lägga in en giltlig https adress som imageURL (ser förslag nedan).
- Då måsta ha ett pris på minst 1 sek.

![image](https://github.com/user-attachments/assets/9537f9ad-b1a6-45fa-95de-b9fdeb66a0d3)



Här är dummy-data ni kan använda:


```

{
  "imageURL": "https://dforbreakfastimg.s3.eu-north-1.amazonaws.com/blackCoffee.avif",
  "category": "Beverage",
  "ingredients": {},
  "description": "Freshly brewed black coffee, the perfect start to your day.",
  "inStock": true,
  "productPrice": 25,
  "preparationTime": "2 minutes",
  "productName": "Black Coffee"
},
{
  "imageURL": "https://dforbreakfastimg.s3.eu-north-1.amazonaws.com/pancake.avif",
  "category": "Dish",
  "ingredients": {},
  "description": "Classic pancakes with jam and whipped cream.",
  "inStock": true,
  "productPrice": 50,
  "preparationTime": "10 minutes",
  "productName": "Pancakes"
},
{
  "imageURL": "https://dforbreakfastimg.s3.eu-north-1.amazonaws.com/blueberrymuppin.avif",
  "category": "SwedishFika",
  "ingredients": {},
  "description": "Blueberry muffins with a moist filling.",
  "inStock": true,
  "productPrice": 20,
  "preparationTime": "0 minutes",
  "productName": "Blueberry Muffins"
}

```
  
##

<h4>Som EJ inloggad</h4>
  
http://dforbreakfast.s3-website.eu-north-1.amazonaws.com/staff
  
http://dforbreakfast.s3-website.eu-north-1.amazonaws.com/staff/menu
- försöker du komma åt staff eller staff/menu som är våra admin-sidor så får du en trevlig överaskning.


##

<h4>Kort om meny sidan:</h4>

- här kan du se alla produkter som finns.
- du kan sortera produkterna på kategorier och pris. 
  
- välj sort och antal produkter, gå sedan till varukorgen.
- Där kan du välja att renasa produkterna eller att lägga ordern via "order" knappen.
- vid lagd order kommer en modal upp där du kan fylla i dina betalningsuppgifter

Här är ett exempel på giltiga betalningsuppgifter:

  ![image](https://github.com/user-attachments/assets/4b82f618-b91d-4b41-a0ae-a32530849903)

##
<h4>Kort om betalningsbekräftelse: </h4>

- Vid lyckad betalning routas ni till en betalningsbekräftelse

![image](https://github.com/user-attachments/assets/934d3f6f-288e-4c62-b936-94037414139d)
  
- Här kan ni skicka med ett meddelande till kocken ifall ni skulle ha några allergier eller andra önskemål.
- Om du klickar knappen "Cancel order" så raderas din beställning (vi behåller såklart pengarna!).

##

<h4>Vid låst order:</h4>  

- Öppna upp en till flik och logga in som admin så kommer du till ordersidan där du hittar din order längst ner i pending-listan.

  ![image](https://github.com/user-attachments/assets/d362347f-c22d-406c-b4fa-73b4c78d87d7)
  
- om du bockar i preparing så låser du ordern och den kan inte längre uppdateras av kunden/personal.
- Försöker du klicka på cancel eller lägga ett meddelande från betalningsbekräftelse-sidan så går ej detta längre då ordern har börjat tillagats.

Då kommer det se ut såhär (klicka då på close-knappen för att stänga bekräftelsen):

![image](https://github.com/user-attachments/assets/6d716927-bb4a-4bf0-98e7-da925491cb44)



  
