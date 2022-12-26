// write me a tic tac toe game using pygame

# Path: game.py

import pygame
import sys
import time

pygame.init()

# Colors

BLACK = (0, 0, 0)

WHITE = (255, 255, 255)

RED = (255, 0, 0)

GREEN = (0, 255, 0)

BLUE = (0, 0, 255)

# Screen

size = (600, 600)

screen = pygame.display.set_mode(size)

pygame.display.set_caption("Tic Tac Toe")

# Fonts

font = pygame.font.SysFont('Calibri', 25, True, False)

# Images

# Loop until the user clicks the close button.

done = False

# Used to manage how fast the screen updates

clock = pygame.time.Clock()

# -------- Main Program Loop -----------

while not done:
    