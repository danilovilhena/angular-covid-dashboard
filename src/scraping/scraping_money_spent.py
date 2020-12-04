from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd
import time

url = "http://www.portaltransparencia.gov.br/coronavirus"

arrayEstados = []
arrayFaturamento = []

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('ignore-certificate-errors')
chrome_options.add_argument('--ignore-certificate-errors')
chrome_options.add_argument("--window-size=1920,1080")
chrome_options.add_argument("--disable-extensions")
chrome_options.add_argument("--proxy-server='direct://'")
chrome_options.add_argument("--proxy-bypass-list=*")
chrome_options.add_argument("--start-maximized")
chrome_options.add_argument('--headless')
chrome_options.add_argument('--disable-gpu')
chrome_options.add_argument('--disable-dev-shm-usage')
chrome_options.add_argument('--no-sandbox')

driver = webdriver.Chrome(executable_path=ChromeDriverManager().install(), chrome_options=chrome_options)
driver.get(url)

# Scraping
driver.find_element_by_xpath('//*[@id="mapa-brasil"]/div[2]/button').click()
time.sleep(2)
for i in range(1, 28):
    nomeEstado = driver.find_element_by_xpath('//*[@id="tabelaMapa"]/table[1]/tbody/tr[' + str(i) + ']/td[1]').text
    valor = driver.find_element_by_xpath('//*[@id="tabelaMapa"]/table[1]/tbody/tr[' + str(i) + ']/td[4]').text
    valor = valor[3:]
    valor = valor.replace('.','')
    valor = valor.replace(',','.')
    arrayEstados.append(nomeEstado)
    arrayFaturamento.append(valor)

planilha = pd.DataFrame({"Estado": arrayEstados, "Dinheiro": arrayFaturamento})
planilha.set_index('Estado', inplace=True)

planilha.to_csv('./src/assets/data/dinheiro.csv')