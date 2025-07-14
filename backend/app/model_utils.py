from transformers import RobertaForSequenceClassification, RobertaTokenizer
import torch
model_name = "roberta-base"
model_file = "backend\models\ft-roberta-amazonreviews.pt"
tokenizer = RobertaTokenizer.from_pretrained(model_name)
model = torch.load(model_file, weights_only=False)
device="cuda"
query = """I work in the wedding industry and have to work long days, on my feet, outside in the heat, and have to look professional. I've spent a ridiculous amount of money on high end dress shoes like Merrels and just have not been able to find a pair that are comfortable to wear all day. Both for my feet and my back. Enter the Sanuk yoga sling!!! These shoes are amazingly comfortable. Though, I will admit it took a few wears to get used to the feel of the yoga matte bottom. At first, it felt a little "sticky" to me, and the fabric part that goes through the toe area was a little thick and took some getting used to. I wore them for a few days before taking them out on a job and I can't get over how comfortable they are. Ii have been wearing these shoes now for 3 months, every work day and I am THRILLED. No more back pain, no more sore feet. I also wear these sometimes during my off time,mans every time I wear them, I get compliments on how cute and comfortable they look. The great thing about these shoes is the yoga matte bottom. It helps your feet grip to the shoe a bit, so your foot can just walk normally, without having to grip the shoe. You may not realize it, but with a lot of Sandals, your foot is having to work to keep the shoe on, changing the way you walk and stand and ultimately causing foot and back pain. Not with these! Also, the soft linen sits comfortably on your skin and breathes nicely in the heat. The only downside is the funky tan lines, which is why I am sure to alternate shoes on my days off, especially if I plan to be outside for most of the day. If it were not for that, I think these might be the only shoes I'd wear all summer. If you are looking for a reasonable priced, comfortable shoe that you can wear and walk in all day."""
tokens = tokenizer.encode(query,return_tensors="pt")
all_tokens = len(tokens)
mask = torch.ones_like(tokens)

with torch.no_grad():
    logits = model(tokens.to(device), attention_mask=mask.to(device))[0]
    probs = logits.softmax(dim=-1)

fake, real = probs.detach().cpu().flatten().numpy().tolist()

print(f"Real Probability: {real}\nFake Probability: {fake}")

query = """My old bet was wearing this to the Macy's in January.  This is the first one I've ever had.  I am a 32D, and the first pair I bought were just a little tight.  I'm a bit disappointed.  This is my second pair.  I'm looking forward to wearing them to the Macy's in the fall.  I like the way they look.Love these!These are my favorite.  I have a hard time finding jeans that fit me comfortably, but I have a hard time finding jeans that don't fit.  These jeans are super comfortable and have a great price point.  I have some great jeans to wear for work, but these are the only jeans that I wear for work or for my family.  I will be buying more!  I have a lot of compliments on them.I love these shoes. I love the color and the fit. They fit my body well and are comfortable. I have a wide foot and these fit me well.

I'm 5'4", 130lbs and these fit well. I would recommend them.I wear a size 11.5 in jeans and this fits perfect. I have a narrow foot and this fits perfect. It is very comfortable and fits great. I bought a small and it fit perfectly. I will order another size up.I bought these for my husband, he loves them and he loves them!This is the best pair of sunglasses for the price!  They are so comfortable and easy to use.  I wear them all the time and they don't hurt my feet.  I wear them everyday and my feet are so happy with them!"""
tokens = tokenizer.encode(query,return_tensors="pt")
all_tokens = len(tokens[0])
mask = torch.ones_like(tokens)

with torch.no_grad():
    logits = model(tokens.to(device), attention_mask=mask.to(device))[0]
    probs = logits.softmax(dim=-1)

fake, real = probs.detach().cpu().flatten().numpy().tolist()

print(f"Real Probability: {real}\nFake Probability: {fake}")