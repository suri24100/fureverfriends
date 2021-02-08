function populate(s1,s2){
    var s1 = document.getElementById(s1);
    var s2 = document.getElementById(s2);
    s2.innerHTML = ""; //clears out whatever is in the second select
    if(s1.value == "Cat"){
        console.log(s1.value);
        //first string before | is the value and second is the label
        var optionArray = ["abyssinian|Abyssinian","american bobtail|American Bobtail","american curl|American Curl","american shorthair|American Shorthair","american wirehair|American Wirehair","applehead siamese|Applehead Siamese","balinese|Balinese","bengal|Bengal","birman|Birman","bombay|Bombay","british shorthair|British Shorthair","burmese|Burmese","burmilla|Burmilla","calico|Calico","canadian hairless|Canadian Hairless","chartreusx|Chartreusx","chausie|Chausie","chinchilla|Chinchilla","cornish rex|Cornish Rex","cymric|Cymric","devon rex|Devon Rex","dilute calico|Dilute Calico","dilute tortoiseshell|Dilute Tortoiseshell","domestic longhair|Domestic Longhair","domestic mediumhair|Domestic Mediumhair","domestic shorthair|Domestic Shorthair","egyptian mau|Egyptian Mau","exotic shorthair|Exotic Shorthair","havana|Havana","himalayan|Himalayan","japanese bobtail|Japanese Bobtail","javanese|Javanese","korat|Korat","laperm|Laperm","maine coon|Maine Coon","manx|Manx","munchkin|Munchkin","nebelung|Nebelung","norwegian forst cat|Norwegian Forst Cat","ocicat|Ocicat","oriental long hiar|Oriental Long Hiar","oriental short hair|Oriental Short Hair","oriental tabby|Oriental Tabby","persian|Persian","pixiebob|Pixiebob","ragamuffin|Ragamuffin","ragdoll|Ragdoll","russian blue|Russian Blue","scottish fold|Scottish Fold","siamese|Siamese","siberian|Siberian","silver|Silver","singapura|Singapura","snowshoe|Snowshoe","somali|Somali","sphynx/hairless|Sphynx/hairless","tabby|Tabby","tiger|Tiger","tonkinese|Tonkinese","torbie|Torbie","tortoiseshell|Tortoiseshell","toyger|Toyger","turkish angora|Turkish Angora","turkish van|Turkish Van","tuxedo|Tuxedo","york chocolate|York Chocolate","no preference|No Preference"];

    } else if(s1.value == "Dog"){
        var optionArray = ["affenpinscher|Affenpinscher","aghan hound|Aghan Hound","airedale terrier|Airedale Terrier","akbash|Akbash","akita|Akita","alaskan malamute|Alaskan Malamute","american bulldog|American Bulldog","american bully|American Bully","american eskimo dog|American Eskimo Dog","american foxhound|American Foxhound","american hairless terrier|American Hairless Terrier","american staffordshire terrier|American Staffordshire Terrier","american water spaniel|American Water Spaniel","anatolian shepherd|Anatolian Shepherd","appenzell mountain dog|Appenzell Mountain Dog","aussiedoodle|Aussiedoodle","australian cattle dog|Australian Cattle Dog","australian kelpie|Australian Kelpie","australian shepherd|Australian Shepherd","basenji|Basenji","basset hound|Basset Hound","beagle|Beagle","bearded collie|Bearded Collie","beauceron|Beauceron","bedlington terrier|Bedlington Terrier","belgian shepherd|Belgian Shepherd","barnedoodle|Barnedoodle","bernese mountain dog|Bernese Mountain Dog","bichon frise|Bichon Frise","coonhound|Coonhound","black labrador retriever|Black Labrador Retriever","black mouth cur|Black Mouth Cur","black russian terrier|Black Russian Terrier","bloodhound|Bloodhound","blue lucy|Blue Lucy","bluetick coonhound|Bluetick Coonhound","boerboel|Boerboel","bolognese|Bolognese","border collie|Border Collie","border terrier|Border Terrier","borzoi|Borzoi","boston terrier|Boston Terrier","bouvier des flandres|Bouvier des Flandres","boxer|Boxer","boykin spaniel|Boykin Spaniel","briard|Briard","brittany spaniel|Brittany Spaniel","brussels griffon|Brussels Griffon","bull terrier|Bull Terrier","bullmastiff|Bullmastiff","cairn terrier|Cairn Terrier","canaan dog|Canaan Dog","cane corso|Cane Corso","cardigan welsh corgi|Cardigan Welsh Corgi","carolina dog|Carolina Dog","catahoula leopard dog|Catahoula Leopard Dog","cattle dog|Cattle Dog","caucasian sheepdog|Caucasian Sheepdog","cavachon|Cavachon","cavalier king charles spaniel|Cavalier King Charles Spaniel","cavapoo|Cavapoo","chesapeake bay retriever|Chesapeake Bay Retriever","chihuahua|Chihuahua","chinese crested dog|Chinese Crested Dog","chinese foo dog|Chinese Foo Dog","chinook|Chinook","chiweenie|Chiweenie","chocolate labrador retriever|Chocolate Labrador Retriever","chow chow|Chow Chow","cirneco dell'etna|Cirneco dell'Etna","clumber spaniel|Clumber Spaniel","cockapoo|Cockapoo","cocker spaniel|Cocker Spaniel","collie|Collie","corgi|Corgi","coton de tulear|Coton de Tulear","curly coated retriever|Curly Coated Retriever","dachshund|Dachshund","dalmation|Dalmation","dutch shepherd|Dutch Shepherd","english bulldog|English Bulldog","english cocker spaniel|English Cocker Spaniel","english coonhound|English Coonhound","english foxhound|English Foxhound","english pointer|English Pointer","english setter|English Setter","english shepherd|English Shepherd","english springer spaniel|English Springer Spaniel","english toy spaniel|English Toy Spaniel","eskimo dog|Eskimo Dog","feist|Feist","field spaniel|Field Spaniel","fila brasileiro|Fila Brasileiro","finnish lapphund|Finnish Lapphund","finnish spitz|Finnish Spitz","flat coated retriever|Flat Coated Retriever","fox terrier|Fox Terrier","foxhound|Foxhound","french bulldog|French Bulldog","galgo spanish greyhound|Galgo Spanish Greyhound","german pinscher|German Pinscher","german shepherd|German Shepherd","german shorthaired pointer|German Shorthaired Pointer","german spitz|German Spitz","golden retriever|Golden Retriever","goldendoodle|Goldendoodle","great dane|Great Dane","great pyreness|Great Pyreness","greater swiss mountain dog|Greater Swiss Mountain Dog","greyhound|Greyhound","hamiltonstovare|Hamiltonstovare","harrier|Harrier","havanese|Havanese","hound|Hound","husky|Husky","ibizan hound|Ibizan Hound","icelandic sheepdog|Icelandic Sheepdog","irish setter|Irish Setter","irish terrier|Irish Terrier","jindo|Jindo","kai dog|Kai Dog","komondor|Komondor","labradoodle|Labradoodle","labrador retriever|Labrador Retriever","maltese|Maltese","manchaster terrier|Manchaster Terrier","mixed breed|Mixed Breed","morkie|Morkie","mountain dog|Mountain Dog","munsterlander|Munsterlander","new guinea singing dog|New Guinea Singing Dog","newfoundland dog|Newfoundland Dog","otterhound|Otterhound","pit bull terrier|Pit Bull Terrier","pomeranian|Pomeranian","pomsky|Pomsky","poodle|Poodle","pug|Pug","retriever|Retriever","rottweiler|Rottweiler","rough collie|Rough Collie","saint bernard|Saint Bernard","saluki|Saluki","samoyed|Samoyed","schnoodle|Schnoodle","scottish deerhound|Scottish deerhound","scottish terrier|Scottish Terrier","sealyham terrier|Sealyham Terrier","shepherd|Shepherd","shiba inu|Shiba Inu","shih tzu|Shih Tzu","siberian husky|Siberian Husky","spaniel|Spaniel","yellow labrador retriever|Yellow Labrador Retriever","yorkshire terrier|Yorkshire Terrier","no preference|No Preference"];

    } else if(s1.value == "HamsterGuinea"){
        var optionArray = ["abyssinian|Abyssinian","chinchilla|Chinchilla","degu|Degu","dwarf hamster|Dwarf Hamster","ferret|Ferret","gerbil|Gerbil","guinea pig|Guinea pig","hamster|Hamster","hedgehog|Hedgehog","mouse|Mouse","peruvian|Peruvian","prairie dog|Prairie Dog","rat|Rat","rex|Rex","short haired|Short Haired","silkie/sheltie|Silkie/Sheltie","skunk|Skunk","sugar glider|Sugar Glider","teddy|Teddy","no preference|No Preference"];

    }else if(s1.value == "Rabbit"){
        var optionArray = ["american|American","american fuzzy lop|American Fuzzy Lop","american sable|American Sable","angora rabbit|Angora Rabbit","belgian hare|Belgian Hare","beveren|Beveren","britannia petite|Britannia Petite","bunny rabbit|Bunny Rabbit","californian|Californian","champagne d'argent|Champagne D'Argent","checkered giant|Checkered Giant","chinchilla|Chinchilla","cinnamon|Cinnamon","dutch|Dutch","dwarf|Dwarf","dwarf eared|Dwarf Eared","english lop|English Lop","english spot|English Spot","flemish giant|Flemish Giant","florida white|Florida White","french lop|French Lop","harlequin|Harlequin","havana|Havana","himalayan|Himalayan","holland lop|Holland Lop","hotot|Hotot","jersey wooly|Jersey Wooly","lilac|Lilac","lionhead|Lionhead","lop eared|Lop Eared","mini lop|Mini Lop","mini rex|Mini Rex","netherland dwarf|Netherland Dwarf","new zealand|New Zealand","palomino|Palomino","polish|Polish","rex|Rex","rhinelander|Rhinelander","satin|Satin","silver|Silver","silver fox|Silver Fox","silver marten|Silver Marten","tan|Tan","no preference|No Preference"];

    }else if(s1.value == "Fish"){
        var optionArray = ["freshwater fish|Freshwater Fish","goldfish|Goldfish","saltwater fish|Saltwater Fish","no preference|No Preference"];

    }else if(s1.value == "ReptileAmphibians"){
        var optionArray = ["asian box turtle|Asian Box Turtle","bearded dragon|Bearded Dragon","box turtle|Box Turtle","bullfrog|Bullfrog","chameleon|Chameleon","fire bellied toad|Fire Bellied Toad","frog|Frog","gecko|Gecko","horned frog|Horned Frog","iguana|Iguana","leopard frog|Leopard Frog","lizard|Lizard","mississippi map turle|Mississippi Map Turle","monitor|Monitor","mud turtle|Mud Turtle","musk turtle|Musk Turtle","ornamental box turtle|Ornamental Box Turtle","painted turtle|Painted Turtle","red eared slider|Red Eared Slider","red foot tortoise|Red Foot Tortoise","russian tortoise|Russian Tortoise","snapping turtle|Snapping Turtle","soft shell turtle|Soft Shell Turtle","southern toad|Southern Toad","sulcata tortoise|Sulcata Tortoise","three toed box turtle|Three Toed Box Turtle","toad|Toad","tortoise|Tortoise","tree frog|Tree Frog","turtle|Turtle","uromastyx|Uromastyx","water dragon|Water Dragon","no preference|No Preference"];

    }else if(s1.value == "Bird"){
        var optionArray = ["african grey parrot|African Grey Parrot","amazon parrot|Amazon Parrot","brotogeris parrots|Brotogeris Parrots","budgie parrots|Budgie Parrots","button-quail|Button-Quail","caique|Caique","canary|Canary","chicken|Chicken","cockatiel|Cockatiel","cockatoo|Cockatoo","conure|Conure","dove|Dove","duck|Duck","eclectus|Eclectus","emu|Emu","finch|Finch","goose|Goose","guinea fowl|Guinea Fowl","kakariki|Kakariki","lory/lorikeet|Lory/Lorikeet","lovebird|Lovebird","macaw|Macaw","ostrich|Ostrich","parakeet|Parakeet","parrot|Parrot","parrotlet|Parrotlet","peacock|Peacock","pheasant|Pheasant","pigeon|Pigeon","pionus|Pionus","quail|Quail","quaker parakeet|Quaker Parakeet","rhea|Rhea","rosella|Rosella","swan|Swan","toucan|Toucan","turkey|Turkey","no preference|No Preference"];

    }else if(s1.value == "Other"){
        var optionArray = ["hermit crab|Hermit Crab","scorpion|Scorpion","tarantula|Tarantula","hermit crab|Hermit Crab","scorpion|Scorpion","tarantula|Tarantula","noPreference|No Preference"];
        
    }else {
        var optionArray = ["noPreference|No Preference"];
    }
    for(var option in optionArray){
        var pair = optionArray[option].split("|");
        console.log(pair);
        var newOption = document.createElement("option");
        newOption.value = pair[0];
        newOption.innerHTML = pair[1];
        s2.options.add(newOption);
    }
}

var slideIndex = 1;
showSlides(slideIndex);

var counter = 1;
setInterval(function(){
    document.getElementById('dot' + counter).checked = true;
    counter++;
    if(counter > 4){
    counter = 1;
    }
}, 5000);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("quotes");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}