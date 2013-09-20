# -*- coding: utf-8 -*-
import pandas as pd

df = pd.read_csv(
    '../data/kerg.csv', skiprows=5, header=None, encoding='iso-8859-1', sep=';')

# limit rows to state results, area code 99 is Bundesgebiet
col_area = df[2]
df_states = df[col_area == 99]

col_map = {
    1: 'Bundesland',                # B
    3: 'Wahlberechtigte',           # D
    7: 'Wähler',                    # H
    15: 'Gültige Erststimmen',      # P
    17: 'Gültige Zweitstimmen',     # R
    19: 'SPD Erststimmen',
    21: 'SPD Zweitstimmen',
    23: 'CDU Erststimmen',
    25: 'CDU Zweitstimmen',
    27: 'FDP Erststimmen',
    29: 'FDP Zweitstimmen',
    31: 'LINKE Erststimmen',
    33: 'LINKE Zweitstimmen',
    35: 'GRÜNE Erststimmen',
    37: 'GRÜNE Zweitstimmen',
    39: 'CSU Erststimmen',
    41: 'CSU Zweitstimmen',
    43: 'NPD Erststimmen',
    45: 'NPD Zweitstimmen',
    47: 'REP Erststimmen',
    49: 'REP Zweitstimmen',
}

# vote cols
vote_cols = sorted(col_map.keys())
df_votes = df_states[vote_cols]

# change column headings to meaningful strings
df_votes.columns = df_votes.columns.map(lambda x: col_map[x])

# save as CSV without the 1st index col
df_votes.to_csv(
    '../data/bundestagswahl_2009.csv', index=False, encoding='utf-8')