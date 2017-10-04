"""Route declarations for the Bracket site."""

# bracket is the package that instantiates and configures the the flask app with
# boilerplate logic for auth, intl routes, and static file serving stuff.
#
# intl:     Flask blueprint for intl routes.
# kcs:      Wrapper for the kcs rest api.
# root:     Flask blueprint for root routes.
import bracket
from bracket import intl
from bracket import kcs
from bracket import root
import flask


#########
######### Routes for the website.
#########

@root.route('/')
@intl.route('/')
def index():
  """Return a polite greeting to the user."""

  # At this point, results for each query are resolved.
  return flask.render_template('index.jinja',
    greeting='Hey there, ya big ole nerd!'
  )


@root.route('/demo/')
@intl.route('/demo/')
def kcs_demo():
  """Fetches a document from kcs and renders it in the page template."""

  # Fetch the current locale and fallback content concurrently
  content, fallback_content = kcs.batch(
      [
          {
              'document_id': '5711533950631936',
              'collection_id': 'HomepageContent',
              'project_id': 'bracket-site',
              'repo_id': 'bracket',
          },
          {
              'document_id': '5711533950631936',
              'collection_id': 'HomepageContent',
              'project_id': 'bracket-site',
              'repo_id': 'bracket',
              'locale': 'ALL_ALL',
          }
      ])

  fallback = False

  # Assign the fallback content if we are missing the title or description.
  if not content['title'] or not content['description']:
    content = fallback_content
    fallback = True

  # Render that daggum template and return it.
  return flask.render_template(
      'b/demo.jinja', content=content, fallback=fallback)

bracket.run()
