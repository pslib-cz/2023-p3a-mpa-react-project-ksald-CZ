# Mahjongg

## Téma
Mahjongg
stejna funcionalita jako 
https://apps.kde.org/kmahjongg/
![image](https://github.com/pslib-cz/2023-p3a-mpa-react-project-ksald-CZ/assets/113503033/44203030-46f9-4df3-ae7f-b2084195eb9b)


## Odkazy pro vývoj

Zde budou živé linky na:
- figma návrh stránek aplikace [zde](https://www.figma.com/file/2T2RMutLNCvh3XqcUGyRkk/React-Mahjongg?type=design&node-id=0%3A1&mode=design&t=lrKAVBGDwv8LTozW-1)
- odkaz na gh-pages projektu
- odkaz do repozitáře projektu, pokud pracuji v teamu a zde vývoj neprobíhá
- Mahjong tiles used [riichi-mahjong-tiles](https://github.com/FluffyStuff/riichi-mahjong-tiles)

### Z čeho čerpat

- interaktivní hra (předělávka "deskovky")
- mohlo by být použitelné jako solitaire
- nebo "AI" protihráč
- inspirovat se můžete na [zatrolených hrách](https://www.zatrolene-hry.cz/katalog-her/?fType=cat&keyword=&theme=-1&category=-1&minlength=-1&maxlength=-1&localization=6%2C+7%2C+8&min_players=1&max_players=1&age=-1)...
- karetní hry méně typické - např. [Kabo](https://www.zatrolene-hry.cz/spolecenska-hra/kabo-8341/)
- učitelem oblíbená [Cartagena](https://www.zatrolene-hry.cz/spolecenska-hra/cartagena-422/) stále čeká na remake

### Techniky

- využití localStorage / sessionStorage
- čtení dat z externího RestAPI (fetch)
- operace DnD
- využití react-routeru
- funkčnost na mobilu (výjimka je předělávka komplexních deskových her)

### Co není obsahem 

- databáze
- bez vlastních backend service
- trapné věci: *klasické karetní hry*, *člověče nezlob se*, ...