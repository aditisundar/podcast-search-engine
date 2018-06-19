from mygpoclient import api, public, feeds
from mygpoclient.json import JsonClient
import json
import feedparser
from rake_nltk import Rake
import urllib


# SORTING CONSTANTS

NONE = 0
BY_POP = 1
BY_MONTHLY_AVG = 2
BY_LAST_3MONTHS = 3
BY_SUBS_GAINED = 4

# CLIENT FUNCTIONS

username = ""  # aditer
password = ""  # 7424
device_id = ""  # aditi

my_client = api.MygPodderClient(username, password, 'gpodder.net')

num = 15


def get_subscriptions(username, password, device_id, order=NONE):
    my_client = api.MygPodderClient(username, password, 'gpodder.net')
    list = []
    for url in my_client.get_subscriptions(device_id):
        list.append(public_client.get_podcast_data(url))
    list = list[0:num]
    list = appropriate_sort(list, order)
    return jsonify_podcast_list(list)


def get_suggestions(username, password, device_id):
    my_client = api.MygPodderClient(username, password, 'gpodder.net')
    r = Rake()
    final_list = []
    subs = my_client.get_subscriptions(device_id)
    for url in subs:
        pod = public_client.get_podcast_data(url)
        r.extract_keywords_from_text(pod.description)
        keywords = r.get_ranked_phrases()
        for k in keywords[0:5]:
            search_results = public_client.search_podcasts(
                urllib.quote(k.encode('utf8')))
            if(len(search_results) != 0 and search_results[0] not in subs):
                final_list.append(search_results[0])

    final_list = appropriate_sort(final_list, 1)
    return jsonify_podcast_list(final_list)


def filter_subs_by_genre(username, password, device_id, genre, order=NONE):
    '''Return user subscriptions that match a certain tag.'''
    my_client = api.MygPodderClient(username, password, 'gpodder.net')
    final_list = []
    if(genre == "all"):
        return get_subscriptions(username, password, device_id, order)
    pods_match_tag = public_client.get_podcasts_of_a_tag(genre)
    my_subs = []
    for url in my_client.get_subscriptions(device_id):
        my_subs.append(public_client.get_podcast_data(url))
    for p in my_subs:
        if p in pods_match_tag:
            final_list.append(p)
    final_list = final_list[0:num]
    final_list = appropriate_sort(final_list, order)
    return jsonify_podcast_list(final_list)


# PUBLIC FUNCTIONS


public_client = public.PublicClient()


def get_top_list():
    list = public_client.get_toplist()
    return jsonify_podcast_list(list)


def search_podcasts(query, order=NONE):
    list = public_client.search_podcasts(query)
    list = list[0:num]
    list = appropriate_sort(list, order)
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


def search_podcasts_by_genre(query, genre, num, order=NONE):
    '''Return results of search query that match a certain tag.'''
    final_list = []
    if(genre == "all"):
        return search_podcasts(query, order)
    pods_match_tag = public_client.get_podcasts_of_a_tag(genre)
    pods_match_query = public_client.search_podcasts(query)
    for p in pods_match_query:
        if p in pods_match_tag:
            final_list.append(p)
    final_list = appropriate_sort(final_list, order)
    return jsonify_podcast_list(final_list)

# SORT FUNCTIONS


def appropriate_sort(pod_list, order):
    if(order == NONE):
        return pod_list
    if(order == BY_POP):
        return sorted(pod_list, key=lambda pod: pod.subscribers, reverse=True)
    if(order == BY_MONTHLY_AVG):
        return sorted(pod_list, key=get_monthly_avg, reverse=True)
    if(order == BY_LAST_3MONTHS):
        return sorted(pod_list, key=num_in_last_3months, reverse=True)
    if(order == BY_SUBS_GAINED):
        return sorted(pod_list, key=subs_gained_since_last_week, reverse=True)


def subs_gained_since_last_week(podcast):
    return podcast.subscribers - podcast.subscribers_last_week


def get_monthly_freq_list(podcast):
    '''Return an array containing the number of episodes per month in the last 3 months.
    Catches a FeedParseError if feed is unparseable.
    '''

    eps_per_month = [0 for x in range(3)]
    url = podcast.url
    try:
        parsed = feedparser.parse(url)
        for ep in parsed.entries:
            month = ep.published_parsed[1]
            if(month > 6 or month < 4):
                break
            eps_per_month[month-4] += 1
        return eps_per_month
    except:
        return [0, 0, 0]


def num_in_last_3months(podcast):
    '''Return the total number of episodes released in the last 3 months.'''
    freq = get_monthly_freq_list(podcast)
    return freq[2] + freq[1] + freq[0]


def get_monthly_avg(podcast):
    try:
        f = feedparser.parse(podcast.url)
        return len(f.entries)//12
    except:
        return 0


# STRINGIFY FUNCTIONS


def jsonify_podcast(pod):
    '''Returns a JSON representation of a podcast object.'''
    return {
        'title': pod.title,
        'description': pod.description,
        'subscribers': pod.subscribers,
        'logo_url': pod.logo_url,
        'url': pod.url
    }


def jsonify_podcast_list(pod_list):
    '''Returns a JSON representation of a list of JSON objects.'''
    new_pod_list = []
    for entry in pod_list:
        pod = jsonify_podcast(entry)
        new_pod_list.append(pod)
    return JsonClient.encode(new_pod_list)
