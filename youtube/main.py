from pytube import *
import os
import re
from moviepy.editor import *

def listar(url):
    playlist = Playlist(url)
    titulo = playlist.title
    links=[]
    for video in playlist.videos:
        links.append(video)
    return titulo, playlist

def listarv(url):
    video = YouTube(url)
    titulo = video.title
    return titulo, url 
        
def novo_titulo(titulo):
    novotitulo=""
    lista=re.split('\s|\-|\/|\'', titulo)
    for indice, item in enumerate(lista):
        if item != "":
            novotitulo += item
            if indice < (len(lista)-1):
                novotitulo += '-'
    return novotitulo
        
def criar_pasta(titulo):
    novotitulo=novo_titulo(titulo)
    local=f'{os.path.expanduser("~")}/Música/{novotitulo}'
    if  os.path.exists(local) == False:
        os.mkdir(local)
    return local

def baixar_video(local, link):
    video=YouTube(link)
    titulo=novo_titulo(video.title)+'.mp4'
    localvideo=f'{local}/{titulo}'
    if os.path.exists(localvideo) == False:
        video.streams.get_highest_resolution().download(filename=titulo, output_path=local)
        print(f'Vídeo: {titulo[:-4]} ...OK')
    else:
        print(f'Vídeo: {titulo[:-4]} ...OK (já baixado!)')
    return titulo

def converter_video(local, titulo):
    novotitulo=titulo[:-4]+'.mp3'
    video = VideoFileClip(os.path.join(f'{local}/{titulo}'))
    video.audio.write_audiofile(os.path.join(f'{local}/{novotitulo}'))
    print(f'Áudio: {novotitulo} ...OK')
    
def apagar_video(local, titulo):
    localvideo=f'{local}/{titulo}'
    if os.path.exists(localvideo) == True:
        os.remove(localvideo)
    print(f'Vídeo: {titulo} ...APAGADO')


if __name__ == '__main__':
    from argparse import ArgumentParser
    parser = ArgumentParser(description='Baixar audio de videos do YouTube')
    parser.add_argument('-p', '--playlist', type=str, help='Baixar uma playlist de vídeos', required=False)
    parser.add_argument('-v', '--video', type=str, help='Baixar um vídeo', required=False)
    argumentos = parser.parse_args()
    
    if argumentos.video != None and argumentos.playlist == None:
        titulo, link = listarv(argumentos.video)
        local = criar_pasta(titulo)
        videotitulo = baixar_video(local, link)
        converter_video(local, videotitulo)
        apagar_video(local, videotitulo)        
    if argumentos.playlist != None and argumentos.video == None:
        titulo, links =  listar(argumentos.playlist)
        local = criar_pasta(titulo)
        for link in links:
            videotitulo = baixar_video(local, link)
            converter_video(local, videotitulo)
            apagar_video(local, videotitulo)
    else:
        from Janela import *
        j=MainApp().run()