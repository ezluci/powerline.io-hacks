from mitmproxy import http
import requests

def request(flow: http.HTTPFlow) -> None:
    if flow.request.host == "powerline.io":
        if flow.request.path == "/":
            resp = requests.get("http://localhost:41203" + flow.request.path)
            flow.response = http.Response.make(
                resp.status_code,
                resp.content,
                {"Content-Type": resp.headers.get("Content-Type", "text/html")}
            )

        if flow.request.path == "/ezgui.css":
            resp = requests.get("http://localhost:41203" + flow.request.path)
            flow.response = http.Response.make(
                resp.status_code,
                resp.content,
                {"Content-Type": resp.headers.get("Content-Type", "text/css")}
            )

        if flow.request.path.startswith('/js/'):
            resp = requests.get("http://localhost:41203" + flow.request.path)
            flow.response = http.Response.make(
                resp.status_code,
                resp.content,
                {"Content-Type": resp.headers.get("Content-Type", "text/javascript")}
            )