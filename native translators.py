dictionary = [

    {
        "pt": ["eu tenho {x} anos"],
        "en": ["i am {x} years old", "i'm {x} years old"],
        "tp": ["ixé {x} ary"]
    },

    {
        "pt": ["meu nome é {x}", "me chamo {x}", "eu me chamo {x}"],
        "en": ["my name is {x}"],
        "tp": ["xe rera {x}"]
    },

        {
        "pt": ["eu sou {x}"],
        "en": ["i am {x}", "i'm {x}"],
        "tp": ["ixé {x}", "xe {x}"]
    }
]

import re

def translate(text, source, target):
    
    text = text.lower()

    for item in dictionary:

        for sentence in item[source]:
            
            if "{x}" in sentence:

                pattern = sentence.replace("{x}", "(.*)")

                match = re.fullmatch(pattern, text)

                if match:

                    x = match.group(1)

                    return item[target][0].replace("{x}", x)
                
            elif sentence == text:

                return item[target][0]

    return text

print ("1 - Português") 
print ("2 - English")

interface = input(">> ")

if interface == "1":

    print ("\n1 - Português -> Tupi Potiguara")
    print ("2 - Tupi Potiguara -> Português")

    option = input("Escolha a opção de tradução: ")

    if option == "1":

        text = input("Digite o texto em Português: ")

        print("\n" + translate(text, "pt", "tp"))

    elif option == "2":

        text = input("Digite o texto em Tupi Potiguara: ")

        print("\n" + translate(text, "tp", "pt"))

elif interface == "2":

    print ("\n1 - English -> Tupi Potiguara")
    print ("2 - Tupi Potiguara -> English")

    option = input("Choose the translation option: ")

    if option == "1":

        text = input("Enter the text in English: ")

        print("\n" + translate(text, "en", "tp"))

    elif option == "2":

        text = input("Enter the text in Tupi Potiguara: ")

        print("\n" + translate(text, "tp", "en"))