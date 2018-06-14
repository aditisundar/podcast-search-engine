from mygpoclient import api, public
from mygpoclient.json import JsonClient
import json


username = "aditer"
password = "7424"
device_id = "aditi"

NONE = 0
BY_POP = 1
BY_GENRE = 2

public_client = public.PublicClient()
my_client = api.MygPodderClient(username, password, 'gpodder.net')


def get_subscriptions(order=NONE):
    list = []
    for url in my_client.get_subscriptions(device_id):
        list.append(public_client.get_podcast_data(url))
    if(order == BY_POP):
        list = sort_by_popularity(list)
    return jsonify_podcast_list(list)


def get_suggestions():
    return jsonify_podcast_list(my_client.get_suggestions())


def get_top_list():
    return jsonify_podcast_list(public_client.get_toplist())


def search_podcasts(query, order=NONE):
    list = public_client.search_podcasts(query)
    if(order == BY_POP):
        list = sort_by_popularity(list)
    return jsonify_podcast_list(list)


def get_top_genres():
    final_json = []
    list = public_client.get_toptags(100)
    for t in list:
        t = {
            'tag': t.tag,
            'usage': t.usage
        }
        final_json.append(t)
    return JsonClient.encode(final_json)


def filter_subs_by_genre(genre, order=NONE):
    final_list = []
    if(genre == "all"):
        return get_subscriptions(order)
    pods_match_tag = public_client.get_podcasts_of_a_tag(genre)
    my_subs = []
    for url in my_client.get_subscriptions(device_id):
        my_subs.append(public_client.get_podcast_data(url))
    for p in my_subs:
        if p in pods_match_tag:
            final_list.append(p)
    if(order == BY_POP):
        final_list = sort_by_popularity(final_list)
    return jsonify_podcast_list(final_list)


def search_podcasts_by_genre(query, genre, order=NONE):
    final_list = []
    if(genre == "all"):
        return search_podcasts(query, order)
    pods_match_tag = public_client.get_podcasts_of_a_tag(genre)
    pods_match_query = public_client.search_podcasts(query)
    for p in pods_match_query:
        if p in pods_match_tag:
            final_list.append(p)
    if(order == BY_POP):
        final_list = sort_by_popularity(final_list)
    return jsonify_podcast_list(final_list)


def jsonify_podcast(pod):
    return {
        'title': pod.title,
        'description': pod.description,
        'subscribers': pod.subscribers,
        'logo_url': pod.logo_url,
        'url': pod.url
    }


def jsonify_podcast_list(pod_list):
    new_pod_list = []
    for entry in pod_list:
        pod = jsonify_podcast(entry)
        new_pod_list.append(pod)
    return JsonClient.encode(new_pod_list)


def sort_by_popularity(pod_list):
    return sorted(pod_list, key=lambda pod: pod.subscribers, reverse=True)
