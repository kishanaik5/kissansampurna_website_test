import json
import os

locales_dir = 'src/locales'
new_keys = {
    "home": {
        "recent_blogs": "Recent from our Blog"
    }
}

# Language mapping for "Recent from our Blog"
translations = {
    "en": "Recent from our Blog",
    "kn": "ನಮ್ಮ ಬ್ಲಾಗ್‌ನಿಂದ ಇತ್ತೀಚಿನ ಲೇಖನಗಳು",
    "te": "మా బ్లాగ్ నుండి ఇటీవలి కథనాలు",
    "hi": "हमारे ब्लॉग से हाल के लेख",
    "ml": "ഞങ്ങളുടെ ബ്ലോഗിൽ നിന്നുള്ള പുതിയ ലേഖനങ്ങൾ",
    "ta": "எங்கள் வலைப்பதிவு சமீபத்திய கட்டுரைகள்",
    "bn": "আমাদের ব্লগ থেকে সাম্প্রতিক নিবন্ধগুলি",
    "gu": "અમારા બ્લોગ પરથી તાજેતરના લેખ",
    "or": "ଆମ ବ୍ଲଗରୁ ସାମ୍ପ୍ରତିକ ଲେଖା",
    "mr": "आमच्या ब्लॉगवरील अलीकडील लेख"
}

def update_locales():
    for filename in os.listdir(locales_dir):
        if filename.endswith('.json'):
            lang = filename.split('.')[0]
            if lang in translations:
                filepath = os.path.join(locales_dir, filename)
                with open(filepath, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                
                # Add 'home' section if not exists
                if 'home' not in data:
                    data['home'] = {}
                
                data['home']['recent_blogs'] = translations[lang]
                
                # Re-order keys if needed to keep it clean (optional, but good)
                # Let's put 'home' after 'hero' or at the beginning
                ordered_data = {}
                # Keep original order but insert home appropriately
                for key in data:
                    ordered_data[key] = data[key]
                
                with open(filepath, 'w', encoding='utf-8') as f:
                    json.dump(ordered_data, f, ensure_ascii=False, indent=4)
                print(f"Updated {filename}")

if __name__ == "__main__":
    update_locales()
