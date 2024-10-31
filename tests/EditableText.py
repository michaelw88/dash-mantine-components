from dash import callback, dcc, Input, Output, html, MATCH, Dash, _dash_renderer,  no_update, State
from random import randint
import json

import dash_mantine_components as dmc


_dash_renderer._set_react_version("18.2.0")

app = Dash(external_stylesheets=dmc.styles.ALL)
app.layout = dmc.MantineProvider(
     children=[
         dmc.EditableText("test",id="new"),
         dmc.Button("HIT ME", id="button", n_clicks=0),
         dmc.TextInput(id="test", updateOnEnter=True),
         dmc.Text(id="output"),
         dmc.TextInput(id="test2"),
         dmc.Text(id="output2"),

     ],
 )

@callback(
    Output("output", "children"),
    Input("test", "value")
)
def a(a):
    return a

@callback(
    Output("output2", "children"),
    Input("test2", "value")
)
def a(b):
    return b

@callback(
    Output("new", "isEditting"),
    Input("button", "n_clicks"),
    State("new", "isEditting"),
    prevent_initial_call=True
)
def toggle(n_clicks, isEditting):
    print(isEditting)
    if n_clicks == 0:
        return no_update
    else:
        return not isEditting



app.run(debug=True)
